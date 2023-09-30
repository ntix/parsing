import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dictionaries-parser', () => {
  const parser = Is.dictionary;

  it('success', () => {
    const value = { a: '1' };
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = 1;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.dictionary);
    expect(result.value).toBe(null);
  });

  it('each', () => {
    const eachParser = parser.each(Is.int);

    const value = { a: '1' };
    const result = eachParser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual({ a: 1 });
  });
});
