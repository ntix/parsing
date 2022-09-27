import { isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { DateParser } from './DateParser';

export function validateDateEquals(
  value: Date,
  equals: Date,
  formatter: Intl.DateTimeFormat = DateParser.DefaultFormat
) {
  if (
    isNullOrEmpty(value) ||
    formatter.format(value) === formatter.format(equals)
  )
    return { value, success: true, errors: ParseErrors.empty };

  return { value, success: false, errors: { equals } };
}
