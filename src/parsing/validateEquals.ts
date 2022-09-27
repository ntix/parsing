import { isNullOrEmpty } from '../predicates';
import { ParseErrors } from './ParseErrors';

export function validateEquals<T>(value: T, equals: T, strictly: boolean) {
  if (isNullOrEmpty(value) || (strictly ? value === equals : value == equals))
    return { value, success: true, errors: ParseErrors.empty };

  return { value, success: false, errors: { equals } };
}
