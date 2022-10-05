import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-matches', () => {
  const regexName = 'dot-com';
  const regexString = '.com$';
  const parser = Is.string.matches(regexString, regexName);

  it('success', () => {
    const value = 'test@example.com';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('failure', () => {
    const value = 'test@example.co.uk';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.matches(regexName));
    expect(result.value).toEqual(value);
  });
});
