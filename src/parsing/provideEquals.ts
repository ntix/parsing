import { isEqual, isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';
import { ParseErrors } from './ParseErrors';

export function provideEquals<T>(
  equalToValue: T
): IParse<T> {

  return (value: T) => ({
    value,
    success: isNullOrEmpty(value) || isEqual(value, equalToValue),
    errors: ParseErrors.equals(equalToValue)
  });
}
