import { isEqual } from '../predicates';
import { ParseErrors } from './ParseErrors';
import { IParseResult } from './IParseResult';
import { IParseErrors } from './IParseErrors';

/**
 * creates a normalised parse result
 * 
 * @param value parsed value
 * @param errors errors, success is true if empty
 * @returns 
 */
export function createParseResult<T>(
  value: T,
  errors: IParseErrors = ParseErrors.empty
): IParseResult<T> {

  const success = isEqual(errors, ParseErrors.empty);

  return { value, success, errors };
}
