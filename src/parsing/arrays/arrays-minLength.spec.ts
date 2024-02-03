import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-minLength', () => {
  const MIN_LENGTH = 1;
  const schema = Is.array.minLength(MIN_LENGTH);

  it('success', () => {
    const value = [1];
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = [];
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.minLength(MIN_LENGTH));
    expect(result.value).toBe(value);
  });
});
