import { isEqual, isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';
import { ParseErrors } from './ParseErrors';

/**
 * Validate a value is any of values passed
 */
export function provideAnyOf<T>(
  values: unknown[]
): IParse<T> {

  return (value: T) => ({
    value,
    success: isNullOrEmpty(value) || values.some(v => isEqual(v, value)),
    errors: ParseErrors.anyOf(values)
  });
}
