import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseFloat } from './tryParseFloat';

/**
 * provides a parser for a float, or not a float
 * 
 * note. if negated result value will be null 
 * 
 * @returns parser
 */
export function provideParseFloat(
): IParse<number> {

  return (value: NumberParsableTypes) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      parsed = tryParseFloat(value);
      success = parsed !== null;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.float
    };
  };
}
