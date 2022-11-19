import { isNullOrUndefined } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Validate a value is a maximum
 */
export function provideMax<T extends RelationalValidatorTypes>(
  maxValue: T, exclusive: boolean, negate: boolean
) {

  return (value: T) => {
    if (isNullOrUndefined(value)
      || (exclusive ? value < maxValue : value <= maxValue) !== negate)
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.max(maxValue, exclusive);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
