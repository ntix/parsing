import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('numbers-max', () => {
  const max = 10;
  const maxSchema = Schema.int.max(max);

  it('success', () => {
    const value = max - 1;
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

  describe('min', () => {
    const min = 5;
    const maxMinSchema = Schema.int.max(max).min(min);

    it('success', () => {
      const value = min;
      const result = maxMinSchema.parse(value);

      expect(result.success).toBe(true);
      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('success', () => {
      const value = min - 1;
      const result = maxMinSchema.parse(value);

      expect(result.success).toBe(false);
      expect(result.errors).toEqual(ParseErrors.min(min));
      expect(result.value).toBe(value);
    });
  });
});
