import { ParseErrors } from './ParseErrors';
import { IParseResult } from './IParseResult';
import { IParseErrors } from './IParseErrors';
import { isEqual } from '../predicates';

export function createParseResult<T>(value: T, errors: IParseErrors = ParseErrors.empty): IParseResult<T> {
  const success = isEqual(errors, ParseErrors.empty);

  return {
    value,
    success,
    errors: success ? ParseErrors.empty : errors, // for quick check
  };
}
