import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-int-equals', () => {

  describe('number', () => {
    const parser = Is.int.equals(1);

    it('success number', () => {
      const result = parser.parse(1);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(1);
    });

    it('success undefined', () => {
      const result = parser.parse(undefined);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(undefined);
    });

    it('failure number out of range', () => {
      const result = parser.parse(99);

      expect(result.errors).toEqual(ParseErrors.equals(1));
      expect(result.value).toBe(99);
    });
  });

  describe('undefined', () => {
    const parser = Is.int.equals(undefined);

    it('success', () => {
      const result = parser.parse(undefined);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(undefined);
    });

    it('failure number', () => {
      const result = parser.parse(1);

      expect(result.errors).toEqual(ParseErrors.equals(undefined));
      expect(result.value).toBe(1);
    });
  });

});
