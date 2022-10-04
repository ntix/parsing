import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Validate a value is a minimum
 */
export function provideRange<T extends RelationalValidatorTypes>(
  minValue: T, maxValue: T, exclusive: boolean, negate: boolean
) {

  return (value: T) => {
    if (isNullOrEmpty(value)
      || (
        (exclusive ? value > minValue : value >= minValue)
        && (exclusive ? value < maxValue : value <= maxValue)
      ) !== negate
    )
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.range(minValue, maxValue, exclusive);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
