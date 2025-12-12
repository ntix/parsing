import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

export function provideStartsWithString(
  startswithValue: string,
  ignoreCase: boolean
): IParse<string> {

  return (value: string) => ({
    value,
    success: isNullOrEmpty(value) || (() => {
      const a = ignoreCase ? value.toLowerCase() : value;
      const b = ignoreCase ? startswithValue.toLowerCase() : startswithValue;

      return a.startsWith(b);
    })(),
    errors: ParseErrors.startsWith(startswithValue, ignoreCase)
  });
}
