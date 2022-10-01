import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export function validateMax<T extends RelationalValidatorTypes>(value: T, max: T, negate: boolean) {
  if (isNullOrEmpty(value) || value <= max === !negate) return createParseResult(value);

  let errors: IParseErrors = ParseErrors.max(max);
  if (negate) errors = ParseErrors.not(errors);

  return createParseResult(value, errors);
}
