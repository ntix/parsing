import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-int-not-equals', () => {
  describe('number', () => {
    const parser = Is.int.not.equals(1);

    it('success number', () => {
      const result = parser.parse(2);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(2);
    });

    it('success undefined', () => {
      const result = parser.parse(undefined);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(undefined);
    });

    it('failure number out of range', () => {
      const result = parser.parse(1);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.equals(1)));
      expect(result.value).toBe(1);
    });
  });

  describe('undefined', () => {
    const parser = Is.int.not.equals(undefined);

    it('success number', () => {
      const result = parser.parse(2);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(2);
    });

    it('failure undefined', () => {
      const result = parser.parse(undefined);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(undefined);
    });
  });

  describe('null', () => {
    const parser = Is.int.not.equals(null);

    it('success number', () => {
      const result = parser.parse(2);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(2);
    });

    it('failure undefined', () => {
      const result = parser.parse(undefined);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(undefined);
    });
  });
});
