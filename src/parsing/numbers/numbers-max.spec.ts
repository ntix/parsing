import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('numbers-max', () => {
  const max = 10;
  const maxSchema = new Schema().int().max(max);

  it('success', () => {
    const value = max - 1;
    const result = maxSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success string', () => {
    const value = max - 1;
    const result = maxSchema.parse(`${value}`);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success null', () => {
    const value = null;
    const result = maxSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = max + 1;
    const result = maxSchema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({ max });
    expect(result.value).toBe(value);
  });
});
