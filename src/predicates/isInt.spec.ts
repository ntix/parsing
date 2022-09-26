import { isInt } from './isInt';

describe('isInt', () => {
  [
    [null, false] as any,
    [undefined, false],
    [{}, false],
    [[], false],
    [0, true],
    ['1', true],
    [1.2, false],
    ['1.2', false],
    ['', false],
    ['not number', false],
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} an integer`, () => {
      const result = isInt(a);
      expect(result).toBe(expected);
    });
  });
});
