import { isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

export function validateMin(value: number, min: number) {
  if (isNullOrEmpty(value) || value >= min) return createParseResult(value);

  return createParseResult(value, ParseErrors.min(min));
}
