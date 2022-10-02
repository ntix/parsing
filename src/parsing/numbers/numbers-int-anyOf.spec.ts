import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';
import { getNumberEnumValues } from './getNumberEnumValues';

describe('numbers-int-anyOf', () => {
  const anyOf = [1, 2, 4, 5];

  it('anyOf success', () => {
    const result = Is.int.anyOf(anyOf).parse('4');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(4);
  });

  it('anyOf failure', () => {
    const result = Is.int.anyOf(anyOf).parse('3');

    expect(result.errors).toEqual(ParseErrors.anyOf(anyOf));
    expect(result.value).toBe(3);
  });

  describe('enum', () => {
    enum anyOfEnum {
      one = 1,
      four = 4,
    }

    it('anyOf enum success', () => {
      const result = Is.int.anyOf(anyOfEnum).parse('4');

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(anyOfEnum.four);
    });

    it('anyOf failure', () => {
      const result = Is.int.anyOf(anyOfEnum).parse('3');

      expect(result.errors).toEqual(ParseErrors.anyOf(getNumberEnumValues(anyOfEnum)));
      expect(result.value).toBe(3);
    });
  });
});
