import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseFloat } from './tryParseFloat';

/**
 * provides a parser for a float, or not a float
 * 
 * note. if negated result value will be null 
 * 
 * @param negate 
 * @returns parseResult
 */
export function provideParseFloat(negate: boolean = false) {

  return (value: unknown): IParseResult<number> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const parsed = tryParseFloat(value as NumberParsableTypes);

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.float)
      : ParseErrors.float;

    return createParseResult(null, errors);
  };
}
