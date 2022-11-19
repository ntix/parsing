import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-equals', () => {
  const expectedValue = 'value';
  const parser = Is.string.equals(expectedValue);

  it('success', () => {
    const result = parser.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(expectedValue);
  });

  it('failure case', () => {
    const value = expectedValue.toUpperCase();
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toEqual(value);
  });

  it('success ignore case', () => {
    const parser = Is.string.equals(expectedValue, true);
    const value = expectedValue.toUpperCase();
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
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

  it('success empty', () => {
    const result = parser.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = 'not-value';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toEqual(value);
  });
});
