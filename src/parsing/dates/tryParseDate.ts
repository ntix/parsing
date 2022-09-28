import { isNullOrEmpty } from '../../predicates';

/**
 * Attempt to parse a value to a date
 *
 * TODO: improve, add support for user inputted strings US/UK etc
 * @param value to be parsed
 * @returns a date or null
 */
export function tryParseDate(value: any): Date | null {
  if (isNullOrEmpty(value)) return null;

  return new Date(Date.parse(value));
}
