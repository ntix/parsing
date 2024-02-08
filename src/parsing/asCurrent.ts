import { IParseResult } from './IParseResult';
import { ICurrentParser } from './ICurrentParser';

/**
 * Creates a wrap around a parse function
 * 
 * Allows the result to be negated.
 * The parse function should return errors for every result 
 * to allow negation
 * 
 * @param parse parse function that is negatable
 * @param negate negate the result
 * @returns a current parser
 */
export function asCurrent<T>(
  parse: (value: unknown) => IParseResult<T>,
  negate: boolean = false
): ICurrentParser<T> {
  return { parse, negate };
}
