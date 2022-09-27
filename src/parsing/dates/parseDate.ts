import { isDate, isDateType, isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

/**
 * Attempt to parse a value to a date
 *
 * Note: if the parse fails the value passed on to child builders will be null
 *
 * @param value to be parsed
 * @returns a parse result
 */
export function parseDate(value: any) {
  if (isNullOrEmpty(value)) return createParseResult(null);

  if (isDateType(value)) return createParseResult(value);
  if (isDate(value)) return createParseResult(new Date(Date.parse(value)));

  return createParseResult(null, ParseErrors.date);
}
