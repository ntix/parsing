import { isDate } from '../../predicates';

/**
 * Parse a date, throw if not a date
 *
 * TODO: improve, add support for user inputted strings US/UK etc
 * @param value to be parsed
 * @returns a date or null
 */

export function parseDate(value: any): Date | null {
  if (isDate(value)) return new Date(Date.parse(value));

  throw new Error(`could not parse "${value}" as a date`);
}
