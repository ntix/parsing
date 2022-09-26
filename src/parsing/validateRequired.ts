import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';

export function validateRequired(value: any) {
  return isNullOrEmpty(value)
    ? createParseResult(value, ParseErrors.required)
    : createParseResult(value);
}
