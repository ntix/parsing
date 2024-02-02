import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-any-of', () => {
  const strings = ['a', 'b'];
  const schama = Is.string.anyOf(strings);

  it('success', () => {
    const value = strings[0];
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

    expect(result.errors).toEqual(ParseErrors.anyOf(strings));
    expect(result.value).toBe(value);
  });

  describe('ignore case', () => {

    it('success', () => {
      const ignoreCaseSchama = Is.string.anyOf(strings, true);
      const value = strings[0].toUpperCase();
      const result = ignoreCaseSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

  });

  describe('not', () => {
    const notSchama = Is.string.not.anyOf(strings);

    it('success', () => {
      const value = 'o';
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = strings[0];
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.anyOf(strings)));
      expect(result.value).toBe(value);
    });
  });
});
