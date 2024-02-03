import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('booleans-parser', () => {
  const schema = Is.boolean;

  it('success boolean', () => {
    const value = true;
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
    const value = 'true';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(true);
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not boolean', () => {
    const result = schema.parse('a');

    expect(result.errors).toEqual(ParseErrors.boolean);
    expect(result.value).toBe(null);
  });

  describe('not', () => {
    const notSchema = Is.not.boolean;

    it('success boolean', () => {
      const value = 'a';
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(null);
    });

    it('failure', () => {
      const value = true;
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.boolean));
      expect(result.value).toBe(null);
    });
  });
});
