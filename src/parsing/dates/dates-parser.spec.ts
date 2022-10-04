import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dates-parser', () => {
  const parser = Is.date;

  it('success date', () => {
    const value = new Date();
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('success undefined', () => {
    const result = parser.parse(undefined);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success null', () => {
    const result = parser.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success string', () => {
    const value = '3000-01-02';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(new Date(Date.parse(value)));
  });

  it('success string empty', () => {
    const result = parser.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not date', () => {
    const result = parser.parse('a');

    expect(result.errors).toEqual({ date: true });
    expect(result.value).toBe(null);
  });
});
