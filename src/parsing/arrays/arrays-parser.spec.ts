import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-parser', () => {
  const parser = Is.array.not;

  it('success', () => {
    const value = [1];
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = 1;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.array);
    expect(result.value).toBe(null);
  });
});
