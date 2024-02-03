import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-int', () => {
  const schema = Is.int;

  it('success number', () => {
    const value = 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success undefined', () => {
    const value = undefined;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success null', () => {
    const value = null;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success string', () => {
    const value = '1';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(1);
  });

  it('success string empty', () => {
    const value = '';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not int (float)', () => {
    const value = 1.2;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.int);
    expect(result.value).toBe(null);
  });

  it('failure not number', () => {
    const value = 'a';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.int);
    expect(result.value).toBe(null);
  });

  describe('not', () => {
    const notSchema = Is.not.int;

    it('success', () => {
      const value = 'a';
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(null);
    });

    it('failure', () => {
      const value = '1';
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.int));
      expect(result.value).toBe(null);
    });
  });
});
