import { DateParsableTypes } from './DateParsableTypes';
import { tryParseDate } from './tryParseDate';

/**
 * Parse a date, throw if not a date
 *
 * @param value to be parsed
 * @returns a date or null
 */
export function parseDate(value: DateParsableTypes): Date {
  const result = tryParseDate(value);

  if (result === null)
    throw new Error(`could not parse "${value}" as a date`);

  return result;
}
