import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { parseDateArray } from './parseDateArray';
import { parseDate } from './parseDate';

describe('dates-oneOf', () => {
  const oneOf = ['2000-01-01', '3000-01-01'];

  it('oneOf success', () => {
    const value = oneOf[0];
    const result = Is.date.oneOf(oneOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(parseDate(value));
  });

  it('not oneOf success', () => {
    const value = '4000-01-01';
    const result = Is.date.not.oneOf(oneOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(parseDate(value));
  });

  it('oneOf failure', () => {
    const value = '4000-01-01';
    const result = Is.date.oneOf(oneOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.oneOf(parseDateArray(oneOf)));
    expect(result.value).toEqual(parseDate(value));
  });

  it('not oneOf failure', () => {
    const value = oneOf[0];
    const result = Is.date.not.oneOf(oneOf).parse(value);

    expect(result.errors).toEqual(ParseErrors.not(ParseErrors.oneOf(parseDateArray(oneOf))));
    expect(result.value).toEqual(parseDate(value));
  });
});
