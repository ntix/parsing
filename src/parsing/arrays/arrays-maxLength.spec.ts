import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-maxLength', () => {
  const MAX_LENGTH = 1;
  const parser = Is.array.maxLength(MAX_LENGTH);

  it('success', () => {
    const value = [1];
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = [1, 2];
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.maxLength(MAX_LENGTH));
    expect(result.value).toBe(value);
  });
});
