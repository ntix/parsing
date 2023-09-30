import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-parser', () => {
  const parser = Is.array;

  it('success', () => {
    const value = [1];
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = 1;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.array);
    expect(result.value).toBe(null);
  });

  describe('each', () => {
    const eachParser = parser.each(Is.int);

    it('success', () => {
      const value = [1];
      const result = eachParser.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = ['a'];
      const result = eachParser.parse(value);

      expect(result.errors).toEqual({ 0: ParseErrors.int });
      expect(result.value).toEqual([null]);
    });
  });
});
