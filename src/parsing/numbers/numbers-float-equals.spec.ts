import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-equals', () => {
  const expectedValue = 1;
  const schema = Is.float.equals(expectedValue);

  it('success number', () => {
    const result = schema.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(expectedValue);
  });

  it('success undefined', () => {
    const result = schema.parse(undefined);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success null', () => {
    const result = schema.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success string', () => {
    const result = schema.parse(`${expectedValue}`);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(expectedValue);
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = 2;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notSchema = Is.float.not.equals(10);

    it('success', () => {
      const value = 9;
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = 10;
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(value)));
      expect(result.value).toEqual(value);
    });
  });
});
