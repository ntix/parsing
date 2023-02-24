import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-int-enum', () => {
  enum SomeValues{
    One,
    Two
  }
  const parser = Is.int.oneOf(SomeValues);

  it('success number', () => {
    const result = parser.parse(1);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(1);
  });

  it('failure number out of range', () => {
    const result = parser.parse(99);

    expect(result.errors).toEqual(ParseErrors.oneOf(SomeValues));
    expect(result.value).toBe(99);
  });

});
