import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-range', () => {
  const min = 5;
  const max = 10;
  const maxMinSchema = Is.int.range(min, max);

  it('success', () => {
    const value = min;
    const result = maxMinSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success', () => {
    const value = min - 1;
    const result = maxMinSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.range(min, max, false));
    expect(result.value).toBe(value);
  });
});
