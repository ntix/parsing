import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

export function provideEndsWithString(
  endswithValue: string,
  ignoreCase: boolean
): IParse<string> {

  return (value: string) => ({
    value,
    success: isNullOrEmpty(value) || (() => {
      const a = ignoreCase ? value.toLowerCase() : value;
      const b = ignoreCase ? endswithValue.toLowerCase() : endswithValue;

      return a.endsWith(b);
    })(),
    errors: ParseErrors.endsWith(endswithValue, ignoreCase)
  });
}
