import { isDate } from './isDate';

describe('isDate', () => {
  [
    [new Date(), true] as [unknown, boolean],
    [null, false],
    [undefined, false],
    [NaN, false],
    [0, true],
    [1, true],
    ['', false],
    ['not a date', false],
    ['2000-1-1', true],
    ['2000-1-1 10:20:30', true],
    ['2000-01-01T10:20:30Z', true],
    ['1 Jan 2000', true]
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} a date`, () => {
      const result = isDate(a);
      expect(result).toBe(expected);
    });
  });
});
