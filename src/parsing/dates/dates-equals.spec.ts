import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { parseDate } from './parseDate';

describe('dates-equals', () => {
  const expectedValue = new Date(3000, 0, 1, 0, 0, 0, 0);
  const parser = Is.date.equals(expectedValue);

  it('success date', () => {
    const result = parser.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(expectedValue);
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
    const result = parser.parse(expectedValue.toString());

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(expectedValue);
  });

  it('success string empty', () => {
    const result = parser.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = new Date(3000, 0, 2, 0, 0, 0, 0);
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toEqual(value);
  });

  describe('not', () => {
    const parser = Is.date.not.equals('2000-01-01');

    it('success', () => {
      const value = parseDate('3000-01-01');
      const result = parser.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = parseDate('2000-01-01');
      const result = parser.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(value)));
      expect(result.value).toEqual(value);
    });
  });
});
