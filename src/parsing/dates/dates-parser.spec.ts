import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('dates-parser', () => {
  const schema = Schema.date;

  it('success date', () => {
    const value = new Date();
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
    const value = '3000-01-02';
    const result = schema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(new Date(Date.parse(value)));
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not date', () => {
    const result = schema.parse('a');

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({ date: true });
    expect(result.value).toBe(null);
  });
});
