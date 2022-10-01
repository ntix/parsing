import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export function validateMin<T extends RelationalValidatorTypes>(value: T, min: T, negate: boolean) {
  if (isNullOrEmpty(value) || value >= min === !negate) return createParseResult(value);

  let errors: IParseErrors = ParseErrors.min(min);
  if (negate) errors = ParseErrors.not(errors);

  return createParseResult(value, errors);
}
