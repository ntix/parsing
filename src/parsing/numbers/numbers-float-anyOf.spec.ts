import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-anyOf', () => {
  const anyOf = [1.1, 2, 4.2, 5.3];
  const schema = Schema.float.anyOf(anyOf);

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
    const schema = Schema.float.not.anyOf(anyOf);

    it('success', () => {
      const value = 1;
      const result = schema.parse(value);

      expect(result.success).toBe(true);
      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = anyOf[0];
      const result = schema.parse(value);

      expect(result.success).toBe(false);
      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.anyOf(anyOf)));
      expect(result.value).toEqual(value);
    });
  });
});
