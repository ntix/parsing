import { isNullOrUndefined } from '../predicates';
import { isOneOf } from '../predicates/isOneOf';
import { createParseResult } from './createParseResult';
import { NumberEnumMap } from '../numbers';
import { ParseErrors } from './ParseErrors';

/**
 * Validate a value is one of values passed
 */
export function provideOneOf<T>(
  values: T[] | NumberEnumMap, negate: boolean
) {

  return (value: T) => {
    if (isNullOrUndefined(value))
      return createParseResult(null);

    if (isOneOf(value, values) === !negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.oneOf(values))
      : ParseErrors.oneOf(values);

    return createParseResult(value, errors);
  };
}
