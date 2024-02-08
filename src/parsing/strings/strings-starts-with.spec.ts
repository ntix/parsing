import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-starts-with', () => {
  const startsWith = 'end';
  const schama = Is.string.startsWith(startsWith);

  it('success', () => {
    const value = startsWith + 'o';
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

    expect(result.errors).toEqual(ParseErrors.startsWith(startsWith, false));
    expect(result.value).toBe(value);
  });

  describe('ignore case', () => {

    it('success', () => {
      const ignoreCaseSchama = Is.string.startsWith(startsWith, true);
      const value = startsWith.toUpperCase() + 'o';
      const result = ignoreCaseSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

  });

  describe('not', () => {
    const notSchama = Is.string.not.startsWith(startsWith);

    it('success', () => {
      const value = 'o';
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = startsWith + '0';
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.startsWith(startsWith, false)));
      expect(result.value).toBe(value);
    });
  });
});
