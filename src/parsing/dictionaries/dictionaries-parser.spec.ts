import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dictionaries-parser', () => {
  const parser = Is.required.dictionary;

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

  it('required', () => {

    const result = parser.parse(null);

    expect(result.errors).toEqual(ParseErrors.required);
  });

  it('not required', () => {
    const requiredParser = Is.dictionary;

    const result = requiredParser.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
  });

  it('each', () => {
    const eachParser = parser.each(Is.int);

    const value = { a: '1' };
    const result = eachParser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual({ a: 1 });
  });
});
