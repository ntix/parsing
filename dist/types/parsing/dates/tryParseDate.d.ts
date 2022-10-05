import { DateParsableTypes } from './DateParsableTypes';
/**
 * Attempt to parse a value to a date
 *
 * TODO: improve, add support for user inputted strings US/UK etc
 * @param value to be parsed
 * @returns a date or null
 */
export declare function tryParseDate(value: DateParsableTypes): Date | null;
