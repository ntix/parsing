import { isDateType } from './isDateType';

describe('isDateType', () => {
  [
    [new Date(), true] as [unknown, boolean],
    [null, false],
    [undefined, false],
    [NaN, false],
    [0, false],
    [1, false],
    ['', false]
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} a date type`, () => {
      const result = isDateType(a);
      expect(result).toBe(expected);
    });
  });
});
