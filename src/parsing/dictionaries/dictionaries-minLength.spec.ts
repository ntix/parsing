import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dictionary-minLength', () => {
  const MIN_LENGTH = 2;
  const schema = Is.dictionary.minLength(MIN_LENGTH);

  it('success', () => {
    const value = { 'a': 1, 'b': 2 };
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = { 'a': 1 };
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.minLength(MIN_LENGTH));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notSchema = Is.dictionary.not.minLength(MIN_LENGTH);

    it('success', () => {
      const value = { 'a': 1 };
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = { 'a': 1, 'b': 2 };
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.minLength(MIN_LENGTH)));
      expect(result.value).toBe(value);
    });
  });

  describe('exclusive', () => {
    const exclusiveSchema = Is.dictionary.minLength(MIN_LENGTH, true);

    it('success', () => {
      const value = { 'a': 1, 'b': 2, 'c': 3 };
      const result = exclusiveSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = { 'a': 1 };
      const result = exclusiveSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.minLength(MIN_LENGTH, true));
      expect(result.value).toBe(value);
    });
  });
});
