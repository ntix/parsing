import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('booleans-parser', () => {
  const schema = Schema.boolean;

  it('success boolean', () => {
    const value = true;
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

  it('success string', () => {
    const value = 'true';
    const result = schema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(true);
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not boolean', () => {
    const result = schema.parse('a');

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      boolean: true,
    });
    expect(result.value).toBe(null);
  });
});
