import { isString } from './isString';

describe('isString', () => {
  [
    [null, false] as any,
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    ['string', true],
    ['', true],
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} a string`, () => {
      const result = isString(a);
      expect(result).toBe(expected);
    });
  });
});
