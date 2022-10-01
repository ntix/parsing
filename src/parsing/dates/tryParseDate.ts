import { isDate, isNullOrEmpty } from '../../predicates';
import { DateParsable } from './DateParsable';

/**
 * Attempt to parse a value to a date
 *
 * TODO: improve, add support for user inputted strings US/UK etc
 * @param value to be parsed
 * @returns a date or null
 */
export function tryParseDate(value: DateParsable): Date | null {
  if (isNullOrEmpty(value) || !isDate(value)) return null;

  return new Date(value);
}
