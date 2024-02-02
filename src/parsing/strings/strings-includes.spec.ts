import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('strings-includes', () => {
  const includes = 'included';
  const schama = Is.string.includes(includes);

  it('success', () => {
    const value = 'o' + includes + 'o';
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

    expect(result.errors).toEqual(ParseErrors.includes(includes));
    expect(result.value).toBe(value);
  });

  describe('ignore case', () => {

    it('success', () => {
      const ignoreCaseSchama = Is.string.includes(includes, true);
      const value = 'o' + includes.toUpperCase() + 'o';
      const result = ignoreCaseSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

  });

  describe('not', () => {
    const notSchama = Is.string.not.includes(includes);

    it('success', () => {
      const value = 'o';
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = 'o' + includes + 'o';
      const result = notSchama.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.includes(includes)));
      expect(result.value).toBe(value);
    });
  });
});
