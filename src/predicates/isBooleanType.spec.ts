import { isBooleanType } from './isBooleanType';

describe('isBooleanType', () => {
  [true, false].forEach((value) =>
    it(`${value} => true`, () => {
      expect(isBooleanType(value)).toBe(true);
    })
  );

  [null, undefined, 0, 1, NaN, Infinity, Number.NaN, Number.POSITIVE_INFINITY, '', 'true'].forEach((value) =>
    it(`${value} => false`, () => {
      expect(isBooleanType(value)).toBe(false);
    })
  );
});
