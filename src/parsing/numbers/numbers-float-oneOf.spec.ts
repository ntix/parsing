import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-oneOf', () => {
  const oneOf = [1.1, 2, 4.2, 5.3];
  const parser = Is.float.oneOf(oneOf);

  it('oneOf success', () => {
    const result = parser.parse(oneOf[2]);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(4.2);
  });

  it('oneOf failure', () => {
    const result = parser.parse('3.3');

    expect(result.errors).toEqual(ParseErrors.oneOf(oneOf));
    expect(result.value).toBe(3.3);
  });

  describe('not', () => {
    const parser = Is.float.not.oneOf(oneOf);

    it('success', () => {
      const value = 1;
      const result = parser.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = oneOf[0];
      const result = parser.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.oneOf(oneOf)));
      expect(result.value).toEqual(value);
    });
  });
});
