import { isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';

export function validateEquals(value: number, equals: number) {
  if (isNullOrEmpty(value) || value === equals)
    return { value, success: true, errors: ParseErrors.empty };

  return { value, success: false, errors: { equals } };
}
