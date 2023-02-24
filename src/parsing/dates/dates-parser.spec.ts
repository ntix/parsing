import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { DATE_SETTINGS } from './DATE_SETTINGS';

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
    expect(result.value).toBe(undefined);
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

    expect(result.value).toBe(null);
    expect(result.errors).toEqual({ date: true });
  });

  it('format/parse different day first', () => {

    const original = DATE_SETTINGS.parseDayFirst;
    DATE_SETTINGS.parseDayFirst = !DATE_SETTINGS.formatDayFirst;

    const value = '1/2/2000';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(new Date(2000, 1, 1));

    DATE_SETTINGS.parseDayFirst = original;
  });
});
