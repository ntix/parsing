import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { ensureDateArray } from './ensureDateArray';
import { parseDate } from './parseDate';

describe('dates-anyOf', () => {
  const anyOf = ['2000-01-01', '3000-01-01'];

  it('anyOf success', () => {
    const value = anyOf[0];
    const result = Is.date.anyOf(anyOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(parseDate(value));
  });

  it('not anyOf success', () => {
    const value = '4000-01-01';
    const result = Is.date.not.anyOf(anyOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(parseDate(value));
  });

  it('anyOf failure', () => {
    const value = '4000-01-01';
    const result = Is.date.anyOf(anyOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.anyOf(ensureDateArray(anyOf)));
    expect(result.value).toEqual(parseDate(value));
  });

  it('not anyOf failure', () => {
    const value = anyOf[0];
    const result = Is.date.not.anyOf(anyOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.not(ParseErrors.anyOf(ensureDateArray(anyOf))));
    expect(result.value).toEqual(parseDate(value));
  });
});
