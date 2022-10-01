import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('strings', () => {
  const schema = Schema.string;

  it('success', () => {
    const value = 'string';
    const result = schema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
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

  it('success not string', () => {
    const value = 1010;
    const result = schema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value.toString());
  });
});
