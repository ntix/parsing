import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { DATE_SETTINGS } from './DATE_SETTINGS';

describe('dates-parser', () => {
  const schema = Is.date;

  it('success date', () => {
    const value = new Date();
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('success undefined', () => {
    const result = schema.parse(undefined);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success null', () => {
    const result = schema.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });
  it('success string', () => {
    const value = '3000-01-02';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(new Date(Date.parse(value)));
  });

  it('success string iso', () => {
    const value = '2023-04-14T22:54:23.861073+01:00';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(new Date(Date.parse(value)));
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not date', () => {
    const result = schema.parse('a');

    expect(result.value).toBe(null);
    expect(result.errors).toEqual(ParseErrors.date);
  });

  it('failure not date object', () => {
    const result = schema.parse({});

    expect(result.value).toBe(null);
    expect(result.errors).toEqual(ParseErrors.date);
  });

  it('failure not date NaN', () => {
    const result = schema.parse(NaN);

    expect(result.value).toBe(null);
    expect(result.errors).toEqual(ParseErrors.date);
  });

  it('format/parse different day first', () => {

    const original = DATE_SETTINGS.parseDayFirst;
    DATE_SETTINGS.parseDayFirst = !DATE_SETTINGS.formatDayFirst;

    const value = '1/2/2000';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(new Date(2000, 1, 1));

    DATE_SETTINGS.parseDayFirst = original;
  });

  describe('not', () => {
    const notSchema = Is.not.date;

    it('success', () => {
      const value = 'oo';
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(null);
    });

    it('failure', () => {
      const value = new Date();
      const result = notSchema.parse(value);

      expect(result.value).toBe(value);
      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.date));
    });
  });
});
