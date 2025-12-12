import { isNullOrEmpty, isStringType } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

export function provideMatchesString(
  matchValue: string | RegExp,
  name: string
): IParse<string> {

  return (value: string) => ({
    value,
    success: isNullOrEmpty(value) || (() => {

      const re = isStringType(matchValue)
        ? new RegExp(matchValue)
        : matchValue;

      return re.test(value);
    })(),
    errors: ParseErrors.matches(name ?? matchValue)
  });
}
