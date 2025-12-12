import { isEqual, isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

export function provideEqualsString(
  equalToValue: string,
  ignoreCase: boolean
): IParse<string> {

  return (value: string) => ({
    value,
    success: isNullOrEmpty(value) || (() => {
      const a = ignoreCase ? value.toLowerCase() : value;
      const b = ignoreCase ? equalToValue.toLowerCase() : equalToValue;

      return isEqual(a, b);
    })(),
    errors: ParseErrors.equals(equalToValue, ignoreCase)
  });
}
