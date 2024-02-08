import { Is } from '../../Is';
import { provideParseDictionaryValues } from './provideParseDictionaryValues';
import { ParseErrors } from '../ParseErrors';

describe('provideParseDictionaryValues', () => {

  const schema = Is.array.each(Is.int);

  it('success', () => {
    const value = { a: [1], b: [2] };

    const result = provideParseDictionaryValues(schema.parse)(value);

    expect(result.value).toEqual(value);
    expect(result.errors).toBe(ParseErrors.dictionary);
  });

  it('failure', () => {
    const value = { a: ['a'], b: ['b'] };

    const result = provideParseDictionaryValues(schema.parse)(value);

    expect(result.value).toEqual({ a: [null], b: [null] });
    expect(result.errors).toEqual({ a: { 0: { int: true } }, b: { 0: { int: true } } });
  });
});
