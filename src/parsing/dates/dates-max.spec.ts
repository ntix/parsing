import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('dates-max', () => {
  const max = new Date();
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
});
