import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseInt } from './tryParseInt';

/**
 * parse an int
 *
 * @returns an int, undefined or null
 */
export function provideParseInt() {
  return (value: unknown): IParseResult<number> => {
    if (isNullOrUndefined(value))
      return createParseResult(value);
    if (value === '')
      return createParseResult(null);

    const numberValue = tryParseInt(value as NumberParsableTypes);
    return numberValue == null
      ? createParseResult(numberValue, ParseErrors.int)
      : createParseResult(numberValue);
  };
}
