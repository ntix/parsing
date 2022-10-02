import { isDate, isDateType, isNullOrEmpty } from '../../predicates';
import { DateParsableTypes } from './DateParsableTypes';

/**
 * Attempt to parse a value to a date
 *
 * TODO: improve, add support for user inputted strings US/UK etc
 * @param value to be parsed
 * @returns a date or null
 */
export function tryParseDate(value: DateParsableTypes): Date | null {
  if (isNullOrEmpty(value)) return null;
  if (isDateType(value)) return value;
  if (!isDate(value)) return null;

  return new Date(value);
}
