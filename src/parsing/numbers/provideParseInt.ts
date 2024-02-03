import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseInt } from './tryParseInt';

/**
 * provides a parser for an integer, or not an integer
 * 
 * note. if negated result value will be null 
 * 
 * @param negate 
 * @returns parseResult
 */
export function provideParseInt(
  negate: boolean = false
) {

  return (value: unknown): IParseResult<number> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const parsed = tryParseInt(value as NumberParsableTypes);

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.int)
      : ParseErrors.int;

    return createParseResult(null, errors);
  };
}
