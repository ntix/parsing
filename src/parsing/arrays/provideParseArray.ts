import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideParseArray<T>() {

  return (value: T): IParseResult<T[]> => {
    if (isNullOrUndefined(value))
      return createParseResult(null);

    if (Array.isArray(value))
      return createParseResult(value as T[]);

    return createParseResult(null, ParseErrors.array);
  };
}
