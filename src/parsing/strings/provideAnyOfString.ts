import { isEqual, isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

/**
 * Validate a value is any of values passed
 */
export function provideAnyOfString(
  values: string[],
  ignoreCase: boolean
): IParse<string> {

  return (value: string) => ({
    value,
    success: isNullOrEmpty(value) || (() => {
      const a = ignoreCase ? value.toLowerCase() : value;
      const b = ignoreCase ? values.map(v => v.toLowerCase()) : values;

      return b.some(v => isEqual(v, a));
    })(),
    errors: ParseErrors.anyOf(values, ignoreCase)
  });

}
