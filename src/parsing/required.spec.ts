import { Schema } from '../Schema';
import { ParseErrors } from './ParseErrors';

describe('required', () => {
  const schema = new Schema().required();

  it('success', () => {
    const value = 1;
    const result = schema.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure undefined', () => {
    const value = undefined;
    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual(ParseErrors.required);
    expect(result.value).toBe(value);
  });

  it('failure null', () => {
    const value = null;
    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual(ParseErrors.required);
    expect(result.value).toBe(value);
  });

  it('failure empty string', () => {
    const value = '';
    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual(ParseErrors.required);
    expect(result.value).toBe(value);
  });
});
