import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-not-equals', () => {
  const expectedValue = 'value';
  const schema = Is.string.not.equals(expectedValue);

  it('success', () => {
    const value = 'not-value';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const result = schema.parse(expectedValue);

    expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(expectedValue, false)));
    expect(result.value).toEqual(expectedValue);
  });
});
