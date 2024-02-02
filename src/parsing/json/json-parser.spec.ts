import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('json-parser', () => {
  const parser = Is.required.json;

  it('success', () => {
    const value = '{}';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual({});
  });

  it('failure', () => {
    const value = '{';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.json);
    expect(result.value).toBe(null);
  });

  it('required', () => {

    const result = parser.parse(null);

    expect(result.errors).toEqual(ParseErrors.required);
  });

  it('not required', () => {
    const requiredParser = Is.json;

    const result = requiredParser.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
  });

  describe('and complex', () => {
    const complexParser = parser.for({
      date: Is.required.date
    });

    it('success', () => {
      const value = '{"date":"1 Jan 2000"}';
      const result = complexParser.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual({ 'date': new Date('2000-01-01T00:00:00.000Z') });
    });
  });
});