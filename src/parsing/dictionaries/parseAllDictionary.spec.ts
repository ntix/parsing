import { Is } from '../../Is';
import { parseAllDictionary } from './parseAllDictionary';
import { ParseErrors } from '../ParseErrors';

describe('parseAllDictionary', () => {

  const parser = Is.array.each(Is.int);

  it('success', () => {
    const value = { a: [1], b: [2] };

    const result = parseAllDictionary(parser.parse)(value);

    expect(result.value).toEqual(value);
    expect(result.errors).toBe(ParseErrors.empty);
  });

  it('failure', () => {
    const value = { a: ['a'], b: ['b'] };

    const result = parseAllDictionary(parser.parse)(value);

    expect(result.value).toEqual({ a: [null], b: [null] });
    expect(result.errors).toEqual({ a: { 0: { int: true } }, b: { 0: { int: true } } });
  });
});
