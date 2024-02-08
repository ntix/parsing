import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-ends-with', () => {
  const endsWith = 'end';
  const schama = Is.string.endsWith(endsWith);

  it('success', () => {
    const value = 'o' + endsWith;
    const result = schama.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success null', () => {
    const result = schama.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success undefined', () => {
    const result = schama.parse(undefined);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success empty', () => {
    const result = schama.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure', () => {
    const value = 'o';
    const result = schama.parse(value);

    expect(result.errors).toEqual(ParseErrors.endsWith(endsWith, false));
    expect(result.value).toBe(value);
  });

  describe('ignore case', () => {

    it('success', () => {
      const ignoreCaseSchama = Is.string.endsWith(endsWith, true);
      const value = 'o' + endsWith.toUpperCase();
      const result = ignoreCaseSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

  });

  describe('not', () => {
    const notSchama = Is.string.not.endsWith(endsWith);

    it('success', () => {
      const value = 'o';
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = 'o' + endsWith;
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.endsWith(endsWith, false)));
      expect(result.value).toBe(value);
    });
  });
});
