import { isNullOrEmpty } from '../predicates';
import { IParse } from './IParse';
import { ParseErrors } from './ParseErrors';

/**
 * provides a funtion to parse a root value
 * 
 * @param isRequried value is required
 * @returns a parse result
 */
export function provideParseRoot(
  isRequried: boolean
): IParse<unknown> {

  return (value: unknown) => ({
    value,
    success: !isRequried || !isNullOrEmpty(value),
    errors: ParseErrors.required
  });
}
