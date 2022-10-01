import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float', () => {
  const schema = Schema.float;

  it('success number', () => {
    const result = schema.parse(1);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(1);
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
    const result = schema.parse('1');

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(1);
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not number', () => {
    const result = schema.parse('a');

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      float: true,
    });
    expect(result.value).toBe(null);
  });
});
