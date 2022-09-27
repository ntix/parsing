import { isFloat, isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

/**
 * Attempt to parse a value to a float
 *
 * Note: if the parse fails the value passed on to child builders will be null
 *
 * @param value to be parsed
 * @returns a parse result
 */
export function parseFloat(value: any) {
  if (isNullOrEmpty(value)) return createParseResult(null);

  if (isFloat(value)) return createParseResult(Number.parseFloat(value));

  return createParseResult(null, ParseErrors.float);
}
