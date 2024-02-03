import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings', () => {
  const schema = Is.string;

  it('success', () => {
    const value = 'string';
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

  it('success empty', () => {
    const result = schema.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not string', () => {
    const value = 1010;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.string);
    expect(result.value).toEqual(null);
  });

  describe('not', () => {
    const notSchema = Is.not.string;

    it('success', () => {
      const value = 1010;
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(null);
    });

    it('failure not string', () => {
      const value = 'string';
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.string));
      expect(result.value).toEqual(null);
    });

  });
});
