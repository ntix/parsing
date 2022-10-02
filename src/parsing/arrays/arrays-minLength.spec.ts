import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-minLength', () => {
  const MIN_LENGTH = 1;
  const parser = Is.array.minLength(MIN_LENGTH);

  it('success', () => {
    const value = [1];
    const result = parser.parse(value);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = [];
    const result = parser.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual(ParseErrors.minLength(MIN_LENGTH));
    expect(result.value).toBe(value);
  });
});
