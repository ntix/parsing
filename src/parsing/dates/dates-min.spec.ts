import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('dates-min', () => {
  const min = new Date();
  const minSchema = new Schema().date().min(min);

  it('success', () => {
    const value = new Date(min.getTime() + 1000);
    const result = minSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('success string', () => {
    const value = `${new Date(min.getTime() + 1000)}`;
    const result = minSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(`${result.value}`).toEqual(value);
  });

  it('success null', () => {
    const value = null;
    const result = minSchema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = new Date(min.getTime() - 1000);
    const result = minSchema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({ min });
    expect(result.value).toBe(value);
  });
});
