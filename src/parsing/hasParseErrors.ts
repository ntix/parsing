import { ParseErrors } from './ParseErrors';
import { IParseErrors } from './IParseErrors';

/**
 * Check object for parse errors
 *
 * @param value possible errors object
 * @returns true if object is not nullish or ParseErrors.empty
 */
export function hasParseErrors(value: IParseErrors): boolean {

  return value != null && value !== ParseErrors.empty;
}
