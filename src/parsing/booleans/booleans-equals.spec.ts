import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('booleans-equals', () => {
  const schema = Is.boolean.equals(true);

  it('success boolean', () => {
    const result = schema.parse(true);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(true);
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
    const result = schema.parse(true.toString());

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(true);
  });

  it('success string empty', () => {
    const result = schema.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not equal', () => {
    const value = false;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.equals(true));
    expect(result.value).toEqual(value);
  });

  describe('not', () => {

    const notSchema = Is.boolean.not.equals(true);

    it('success', () => {
      const result = notSchema.parse('false');

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(false);
    });

    it('failure', () => {
      const result = notSchema.parse('on');

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(true)));
      expect(result.value).toEqual(true);
    });
  });
});
