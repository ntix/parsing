import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { parseDate } from './parseDate';

describe('dates-equals', () => {
  const expectedValue = new Date(3000, 0, 1, 0, 0, 0, 0);
  const schema = Is.date.equals(expectedValue);

  it('success date', () => {
    const result = schema.parse(expectedValue);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(expectedValue);
  });

  it('success undefined', () => {
    const result = schema.parse(undefined);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success null', () => {
    const result = schema.parse(null);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success string', () => {
    const result = schema.parse(expectedValue.toString());

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(expectedValue);
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = new Date(3000, 0, 2, 0, 0, 0, 0);
    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toEqual(value);
  });

  describe('not', () => {
    const schema = Is.date.not.equals('2000-01-01');

    it('success', () => {
      const value = parseDate('3000-01-01');
      const result = schema.parse(value);

      expect(result.success).toBe(true);
      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = parseDate('2000-01-01');
      const result = schema.parse(value);

      expect(result.success).toBe(false);
      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(value)));
      expect(result.value).toEqual(value);
    });
  });
});
