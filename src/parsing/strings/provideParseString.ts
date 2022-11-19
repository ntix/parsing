import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';

/**
 * parse a string
 *
 * empty string is normalised to null
 *
 * @returns a string, undefined or null
 */
export function provideParseString() {
  return (value: unknown): IParseResult<string> => {
    if (isNullOrUndefined(value))
      return createParseResult(value);
    if (value === '')
      return createParseResult(null);

    return createParseResult(value.toString());
  };
}
