import { isFloat, isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

export function parseFloat(value: any) {
  if (isNullOrEmpty(value)) return createParseResult(null);

  if (isFloat(value)) return createParseResult(Number.parseFloat(value));

  return createParseResult(null, ParseErrors.float);
}
