import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-equals', () => {
  const expectedValue = 1;
  const parser = Is.float.equals(expectedValue);

  it('success number', () => {
    const result = parser.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(expectedValue);
  });

  it('success undefined', () => {
    const result = parser.parse(undefined);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(undefined);
  });

  it('success null', () => {
    const result = parser.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success string', () => {
    const result = parser.parse(`${expectedValue}`);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(expectedValue);
  });

  it('success string empty - normalised to null', () => {
    const result = parser.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const result = parser.parse(2);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toBe(2);
  });

  describe('not', () => {
    const parser = Is.float.not.equals(10);

    it('success', () => {
      const result = parser.parse(9);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(9);
    });

    it('failure', () => {
      const result = parser.parse(10);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(10)));
      expect(result.value).toEqual(10);
    });
  });
});
