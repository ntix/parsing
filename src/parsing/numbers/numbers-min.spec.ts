import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('numbers-min', () => {
  const min = 10;
  const minSchema = Schema.int.min(min);

  it('success', () => {
    const value = min + 1;
    const result = minSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success string', () => {
    const value = min + 1;
    const result = minSchema.parse(`${value}`);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success null', () => {
    const value = null;
    const result = minSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = min - 1;
    const result = minSchema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({ min });
    expect(result.value).toBe(value);
  });

  describe('max', () => {
    const max = 15;
    const maxMinSchema = Schema.int.min(min).max(max);

    it('success', () => {
      const value = max;
      const result = maxMinSchema.parse(value);

      expect(result.success).toBe(true);
      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = max + 1;
      const result = maxMinSchema.parse(value);

      expect(result.success).toBe(false);
      expect(result.errors).toEqual(ParseErrors.max(max));
      expect(result.value).toBe(value);
    });
  });
});
