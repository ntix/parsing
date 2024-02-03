import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-int-min-max', () => {
  const min = 5;
  const max = 10;
  const maxMinSchema = Is.int.min(min).max(max);

  it('success', () => {
    const value = min;
    const result = maxMinSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure min', () => {
    const value = min - 1;
    const result = maxMinSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min));
    expect(result.value).toBe(value);
  });

  it('failure max', () => {
    const value = max + 1;
    const result = maxMinSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max));
    expect(result.value).toBe(value);
  });
});
