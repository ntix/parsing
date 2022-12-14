import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-min', () => {
  const min = 10;
  const minSchema = Is.int.min(min);

  it('success', () => {
    const value = min + 1;
    const result = minSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success string', () => {
    const value = min + 1;
    const result = minSchema.parse(`${value}`);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success null', () => {
    const value = null;
    const result = minSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = min - 1;
    const result = minSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min, false));
    expect(result.value).toBe(value);
  });

});
