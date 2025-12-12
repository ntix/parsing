import { ParseErrors } from './ParseErrors';
import { IHasLength } from './IHasLength';
import { isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';

export function provideMinLength<T extends IHasLength>(
  minLength: number,
  exclusive: boolean
): IParse<T> {

  return (value: T) => ({
    value,
    success: isNullOrEmpty(value) || (exclusive ? value.length > minLength : value.length >= minLength),
    errors: ParseErrors.minLength(minLength, exclusive)
  });
}
