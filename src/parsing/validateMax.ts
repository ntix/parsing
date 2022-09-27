import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export function validateMax<T extends RelationalValidatorTypes>(
  value: T,
  max: T
) {
  if (isNullOrEmpty(value) || value <= max) return createParseResult(value);

  return createParseResult(value, ParseErrors.max(max));
}
