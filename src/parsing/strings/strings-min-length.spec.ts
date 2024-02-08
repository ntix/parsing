import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { stringOfLength } from '../../.spec/stringOfLength';

describe('strings-min-length', () => {
  const min = 5;
  const schama = Is.string.minLength(min);

  it('success', () => {
    const value = stringOfLength(min + 1);
    const result = schama.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = stringOfLength(min - 1);
    const result = schama.parse(value);

    expect(result.errors).toEqual(ParseErrors.minLength(min));
    expect(result.value).toBe(value);
  });

  it('failure exclusive', () => {
    const exclusiveSchama = Is.string.minLength(min, true);
    const value = stringOfLength(min);
    const result = exclusiveSchama.parse(value);

    expect(result.errors).toEqual(ParseErrors.minLength(min, true));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notSchama = Is.string.not.minLength(min);

    it('success', () => {
      const value = stringOfLength(min - 1);
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = stringOfLength(min + 1);
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.minLength(min)));
      expect(result.value).toBe(value);
    });

  });
});
