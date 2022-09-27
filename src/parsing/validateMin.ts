import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';
import { ParseErrors } from './ParseErrors';

export function validateMin<T extends RelationalValidatorTypes>(
  value: T,
  min: T
) {
  if (isNullOrEmpty(value) || value >= min) return createParseResult(value);

  return createParseResult(value, ParseErrors.min(min));
}
