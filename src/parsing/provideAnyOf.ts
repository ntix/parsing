import { isEqual, isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';

/**
 * Validate a value is any of values passed
 */

export function provideAnyOf<T>(
  values: T[], negate: boolean
) {

  return (value: T) => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    if (values.some(v => isEqual(v, value)) === !negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.anyOf(values))
      : ParseErrors.anyOf(values);

    return createParseResult(value, errors);
  };
}
