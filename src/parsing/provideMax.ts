import { isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Validate a value is a maximum
 */
export function provideMax<T extends RelationalValidatorTypes>(
  maxValue: T,
  exclusive: boolean
): IParse<T> {

  return (value: T) => ({
    value,
    success: isNullOrEmpty(value) || (exclusive ? value < maxValue : value <= maxValue),
    errors: ParseErrors.max(maxValue, exclusive)
  });
}
