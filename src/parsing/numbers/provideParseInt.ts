import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseInt } from './tryParseInt';

/**
 * provides a parser for an integer, or not an integer
 * 
 * note. if negated result value will be null 
 * 
 * @returns parseResult
 */
export function provideParseInt(
  radix: number = undefined
): IParse<number> {

  return (value: NumberParsableTypes) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      parsed = tryParseInt(value, radix);
      success = parsed !== null;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.int
    };
  };
}
