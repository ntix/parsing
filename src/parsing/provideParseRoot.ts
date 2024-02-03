import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';

/**
 *
 * @param isRequried value is required
 * @returns a parse result
 */

export function provideParseRoot(
  isRequried = false
) {

  return (value: unknown) => isRequried && isNullOrEmpty(value)
    ? createParseResult(value, ParseErrors.required)
    : createParseResult(value);
}
