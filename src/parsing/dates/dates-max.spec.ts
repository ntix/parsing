import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('dates-max', () => {
  const max = new Date(3000, 0, 1, 0, 0, 0, 0);
  const maxSchema = new Schema().date().max(max);

  it('success', () => {
    const value = new Date(max.getTime() - 1000);
    const result = maxSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('success string', () => {
    const value = `${new Date(max.getTime() - 1000)}`;
    const result = maxSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(`${result.value}`).toEqual(value);
  });

  it('success null', () => {
    const value = null;
    const result = maxSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = new Date(max.getTime() + 1000);
    const result = maxSchema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({ max });
    expect(result.value).toBe(value);
  });

  describe('min', () => {
    const min = new Date(2000, 0, 1, 0, 0, 0, 0);
    const maxMinSchema = new Schema().date().max(max).min(min);

    it('success', () => {
      const value = min;
      const result = maxMinSchema.parse(value);

      expect(result.success).toBe(true);
      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('success', () => {
      const value = new Date(1000, 0, 1, 0, 0, 0, 0);
      const result = maxMinSchema.parse(value);

      expect(result.success).toBe(false);
      expect(result.errors).toEqual(ParseErrors.min(min));
      expect(result.value).toBe(value);
    });
  });
});
