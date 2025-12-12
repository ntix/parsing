import { isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Validate a value is a minimum
 */
export function provideMin<T extends RelationalValidatorTypes>(
  minValue: T,
  exclusive: boolean
): IParse<T> {

  return (value: T) => {

    return {
      value,
      success: isNullOrEmpty(value) || (exclusive ? value > minValue : value >= minValue),
      errors: ParseErrors.min(minValue, exclusive)
    };
  };
}
