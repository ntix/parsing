import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-anyOf', () => {
  const anyOf = [1.1, 2, 4.2, 5.3];
  const schema = Is.float.anyOf(anyOf);

  it('anyOf success', () => {
    const result = schema.parse(anyOf[2]);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(4.2);
  });

  it('anyOf failure', () => {
    const result = schema.parse('3.3');

    expect(result.errors).toEqual(ParseErrors.anyOf(anyOf));
    expect(result.value).toBe(3.3);
  });

  describe('not', () => {
    const notSchema = Is.float.not.anyOf(anyOf);

    it('success', () => {
      const value = 1;
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = anyOf[0];
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.anyOf(anyOf)));
      expect(result.value).toEqual(value);
    });
  });
});
