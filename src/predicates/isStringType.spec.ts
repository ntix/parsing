import { isStringType } from './isStringType';

describe('isStringType', () => {
  [
    [null, false] as [unknown, boolean],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    ['string', true],
    ['', true]
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} a string`, () => {
      const result = isStringType(a);
      expect(result).toBe(expected);
    });
  });
});
