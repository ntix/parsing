import { isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

export function validateMax(value: number, max: number) {
  if (isNullOrEmpty(value) || value <= max) return createParseResult(value);

  return createParseResult(value, ParseErrors.max(max));
}
