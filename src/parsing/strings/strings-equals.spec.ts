import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('strings-equals', () => {
  const expectedValue = 'value';
  const schema = Schema.string.equals(expectedValue);

  it('success', () => {
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

  it('success empty', () => {
    const result = schema.parse('');

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = 'not-value';
    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual(ParseErrors.equals(expectedValue));
    expect(result.value).toEqual(value);
  });
});
