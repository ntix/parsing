import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-parser', () => {
  const schema = Is.array;

  it('success', () => {
    const value = [1];
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.array);
    expect(result.value).toBe(null);
  });

  describe('each', () => {
    const eachSchema = schema.each(Is.int);

    it('success', () => {
      const value = [1];
      const result = eachSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = ['a'];
      const result = eachSchema.parse(value);

      expect(result.errors).toEqual({ 0: ParseErrors.int });
      expect(result.value).toEqual([null]);
    });
  });

  describe('not', () => {
    const notSchema = Is.not.array;

    it('success', () => {
      const value = 1;
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(null);
    });

    it('failure', () => {
      const value = [1];
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.array));
      expect(result.value).toBe(value);
    });
  });
});
