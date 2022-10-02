import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-max', () => {
  const max = 10;
  const maxSchema = Is.int.max(max);

  it('success', () => {
    const value = max - 1;
    const result = maxSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = max + 1;
    const result = maxSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max, false));
    expect(result.value).toBe(value);
  });
});
