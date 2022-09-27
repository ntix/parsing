import { isInt, isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

/**
 * Attempt to parse a value to a int
 *
 * Note: if the parse fails the value passed on to child builders will be null
 *
 * @param value to be parsed
 * @returns a parse result
 */
export function parseInt(value: any, radix: number = 10) {
  if (isNullOrEmpty(value)) return createParseResult(null);

  if (isInt(value)) return createParseResult(Number.parseInt(value, radix));

  return createParseResult(null, ParseErrors.int(radix));
}
