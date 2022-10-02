import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-not-equals', () => {
  const expectedValue = 'value';
  const parser = Is.string.not.equals(expectedValue);

  it('success', () => {
    const value = 'not-value';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const result = parser.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(expectedValue)));
    expect(result.value).toEqual(expectedValue);
  });
});
