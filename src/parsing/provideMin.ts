import { isNullOrUndefined } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Validate a value is a minimum
 */
export function provideMin<T extends RelationalValidatorTypes>(
  minValue: T, exclusive: boolean, negate: boolean
) {

  return (value: T) => {
    if (isNullOrUndefined(value)
      || (exclusive ? value > minValue : value >= minValue) !== negate)
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.min(minValue, exclusive);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
