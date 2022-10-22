import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('booleans-not', () => {
  const expectedValue = true;
  const parser = Is.boolean
    .not.equals(expectedValue);

  it('success boolean', () => {
    const result = parser.parse(!expectedValue);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(!expectedValue);
  });

  it('failure boolean', () => {
    const result = parser.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(expectedValue)));
    expect(result.value).toEqual(expectedValue);
  });
});
