import { ParseErrors } from './ParseErrors';
import { IHasLength } from './IHasLength';
import { isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';

export function provideMaxLength<T extends IHasLength>(
  maxLength: number,
  exclusive: boolean
): IParse<T> {

  return (value: T) => ({
    value,
    success: isNullOrEmpty(value) || (exclusive ? value.length < maxLength : value.length <= maxLength),
    errors: ParseErrors.maxLength(maxLength, exclusive)
  });
}
