import { tryParseBoolean } from './tryParseBoolean';

describe('tryParseBoolean', () => {
  [1, '1', true, 'true', 'on'].forEach((value) =>
    it(`${value} => true`, () => {
      expect(tryParseBoolean(value)).toBe(true);
    })
  );

  [0, '0', false, 'false', 'off'].forEach((value) =>
    it(`${value} => false`, () => {
      expect(tryParseBoolean(value)).toBe(false);
    })
  );

  [null, undefined, '', NaN, Infinity, Number.NaN, Number.POSITIVE_INFINITY].forEach((value) =>
    it(`${value} => null`, () => {
      expect(tryParseBoolean(value)).toBe(null);
    })
  );
});
