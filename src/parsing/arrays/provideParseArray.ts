import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

/**
 * provides a parser for an array, or not an array
 * 
 * note. if negated result value will be null 
 * 
 * @param negate 
 * @returns parseResult
 */
export function provideParseArray<T>(
  negate: boolean = false
) {

  return (value: T): IParseResult<T[]> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const parsed = Array.isArray(value)
      ? value as T[]
      : null;

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.array)
      : ParseErrors.array;

    return createParseResult(null, errors);
  };
}
