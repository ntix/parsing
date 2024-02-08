import { isNullOrEmpty, isStringType } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

export function provideParseString(
): IParse<string> {

  return (value: unknown) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      parsed = isStringType(value)
        ? value
        : null;
      success = parsed !== null;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.string
    };
  };
}
