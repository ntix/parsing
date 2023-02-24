import { Is } from '../../Is';
import { getNumberEnumValues } from '../../numbers';
import { ParseErrors } from '../ParseErrors';

describe('numbers-int-oneOf', () => {
  const oneOf = [1, 2, 4, 5];

  it('oneOf success', () => {
    const result = Is.int.oneOf(oneOf).parse('4');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(4);
  });

  it('oneOf failure', () => {
    const result = Is.int.oneOf(oneOf).parse('3');

    expect(result.errors).toEqual(ParseErrors.oneOf(oneOf));
    expect(result.value).toBe(3);
  });

  describe('enum', () => {
    enum oneOfEnum {
      one = 1,
      four = 4,
    }

    it('oneOf enum success', () => {
      const result = Is.int.oneOf(oneOfEnum).parse('4');

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(oneOfEnum.four);
    });

    it('oneOf failure', () => {
      const result = Is.int.oneOf(oneOfEnum).parse('3');

      expect(result.errors).toEqual(ParseErrors.oneOf(getNumberEnumValues(oneOfEnum)));
      expect(result.value).toBe(3);
    });
  });
});
