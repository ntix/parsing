import { isInt, isNullOrEmpty } from '../../predicates';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

export function parseInt(value: any, radix: number = 10) {
  if (isNullOrEmpty(value)) return createParseResult(null);

  if (isInt(value)) return createParseResult(Number.parseInt(value, radix));

  return createParseResult(null, ParseErrors.int(radix));
}
