import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { IParseResult } from '../IParseResult';
import { tryParseFloat } from './tryParseFloat';

/**
 * parse an float
 *
 * @returns an float, undefined or null
 */
export function provideParseFloat() {
  return (value: unknown): IParseResult<number> => {
    if (isNullOrUndefined(value))
      return createParseResult(value);
    if (value === '')
      return createParseResult(null);

    const numberValue = tryParseFloat(value);
    return numberValue == null
      ? createParseResult(numberValue, ParseErrors.float)
      : createParseResult(numberValue);
  };
}
