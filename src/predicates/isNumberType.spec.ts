import { isNumberType } from './isNumberType';

describe('isNumberType', () => {
  [0, 1, NaN, Number.NaN, Infinity, Number.POSITIVE_INFINITY].forEach((value) =>
    it(`${value} => true`, () => {
      expect(isNumberType(value)).toBe(true);
    })
  );

  [null, undefined, '', '1', 'true'].forEach((value) =>
    it(`${value} => false`, () => {
      expect(isNumberType(value)).toBe(false);
    })
  );
});
