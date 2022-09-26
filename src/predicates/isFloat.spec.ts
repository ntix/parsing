import { isFloat } from './isFloat';

describe('isFloat', () => {
  [
    [null, false] as any,
    [undefined, false],
    [{}, false],
    [[], false],
    [0, true],
    ['1.2', true],
    ['', false],
    ['not number', false],
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} a float`, () => {
      const result = isFloat(a);
      expect(result).toBe(expected);
    });
  });
});
