import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-equals', () => {
  const expectedValue = 'value';
  const schema = Is.string.equals(expectedValue);

  it('success', () => {
    const result = schema.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(expectedValue);
  });

  it('failure case', () => {
    const value = expectedValue.toUpperCase();
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue, false));
    expect(result.value).toEqual(value);
  });

  it('success ignore case', () => {
    const ignoreCaseSchema = Is.string.equals(expectedValue, true);
    const value = expectedValue.toUpperCase();
    const result = ignoreCaseSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
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

  it('success empty', () => {
    const result = schema.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = 'not-value';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(expectedValue, false));
    expect(result.value).toEqual(value);
  });
});
