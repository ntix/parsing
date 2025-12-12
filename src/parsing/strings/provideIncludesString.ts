import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

export function provideIncludesString(
  includesValue: string,
  ignoreCase = false
): IParse<string> {

  return (value: string) => ({
    value,
    success: isNullOrEmpty(value) || (() => {

      const a = ignoreCase ? value.toLowerCase() : value;
      const b = ignoreCase ? includesValue.toLowerCase() : includesValue;

      return a.includes(b);
    })(),
    errors: ParseErrors.includes(includesValue, ignoreCase)
  });
}
