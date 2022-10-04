import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dates-range', () => {
  const max = new Date(3000, 0, 1, 0, 0, 0, 0);
  const min = new Date(2000, 0, 1, 0, 0, 0, 0);
  const parser = Is.date.range(min, max);

  it('success', () => {
    const value = min;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = new Date(1000, 0, 1, 0, 0, 0, 0);
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.range(min, max, false));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notParser = Is.date.not.range(min, max);

    it('success', () => {
      const value = new Date(1000, 0, 1, 0, 0, 0, 0);
      const result = notParser.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = min;
      const result = notParser.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.range(min, max, false)));
      expect(result.value).toBe(value);
    });
  });
});
