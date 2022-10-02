import { parseDate } from '../parsing';
import { isEqual } from './isEqual';

describe('isEqual', () => {
  [
    [null, null, true] as [unknown, unknown, boolean],
    [undefined, null, false],
    [1, 1, true],
    ['equal', 'equal', true],
    ['equal', 'not equal', false],
    [new Date(), new Date(), true],
    [{}, {}, true],
    [{ a: 1, b: 2 }, { b: 2, a: 1 }, true],
    [{ a: 1, b: 2 }, { b: 1, a: 2 }, false],
    [{ a: [1], b: 2 }, { a: [1], b: 2 }, true],
    [{ a: { c: 1 }, b: 2 }, { a: { c: 1 }, b: 2 }, true],
    [{ a: { c: 1 }, b: 2 }, { a: { c: 3 }, b: 2 }, false],
    [[], [], true],
    [['a', 'b'], ['a', 'b'], true],
    [['a', 'b'], ['b', 'a'], false],
    [['a', 'a', 'b'], ['a', 'b', 'b'], false],
    [['a', 'b', 'c'], ['a', 'b'], false],
    [parseDate('2000-01-01'), parseDate('2000-01-01'), true]
  ].forEach(([a, b, expected]) => {
    it(`${a} eq ${b} ${expected ? 'is' : 'is not'} equal`, () => {
      const result = isEqual(a, b);
      expect(result).toBe(expected);
    });
  });
});
