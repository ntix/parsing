import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dates-min-max', () => {
  const min = new Date(2000, 0, 1, 0, 0, 0, 0);
  const max = new Date(3000, 0, 1, 0, 0, 0, 0);
  const parser = Is.date.min(min).max(max);

  it('success', () => {
    const value = min;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure min', () => {
    const value = new Date(1000, 0, 1, 0, 0, 0, 0);
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min));
    expect(result.value).toBe(value);
  });

  it('failure max', () => {
    const value = new Date(4000, 0, 1, 0, 0, 0, 0);
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max));
    expect(result.value).toBe(value);
  });
});
