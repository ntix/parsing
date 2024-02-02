import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { stringOfLength } from '../../.spec/stringOfLength';

describe('strings-max-length', () => {
  const max = 5;
  const schama = Is.string.maxLength(max);

  it('success', () => {
    const value = stringOfLength(max - 1);
    const result = schama.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = stringOfLength(max + 1);
    const result = schama.parse(value);

    expect(result.errors).toEqual(ParseErrors.maxLength(max));
    expect(result.value).toBe(value);
  });

  it('failure exclusive', () => {
    const exclusiveSchama = Is.string.maxLength(max, true);
    const value = stringOfLength(max);
    const result = exclusiveSchama.parse(value);

    expect(result.errors).toEqual(ParseErrors.maxLength(max));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notSchama = Is.string.not.maxLength(max);

    it('success', () => {
      const value = stringOfLength(max + 1);
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = stringOfLength(max - 1);
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.maxLength(max)));
      expect(result.value).toBe(value);
    });

  });
});