import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('booleans-equals', () => {
  const expectedValue = true;
  const parser = Is.boolean.equals(expectedValue);

  it('success boolean', () => {
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
    const value = false;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toEqual(value);
  });
});
