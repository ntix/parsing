import { createParseResult } from './createParseResult';
import { IParse } from './IParse';

/**
 * cast the result value to given type
 *
 * @param parse parse function
 * @returns casted parse function
 */
export function parseCast<T>(parse: IParse<unknown>): IParse<T> {
  return value => {
    const result = parse(value);
    return createParseResult(
      result.value as T,
      result.errors
    );
  };
}
