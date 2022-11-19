import { isNullOrUndefined } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { IHasLength } from './IHasLength';
import { IParseResult } from './IParseResult';

export function provideMinLength<T extends IHasLength>(
  minLength: number, exclusive: boolean, negate: boolean
) {

  return (value: T): IParseResult<T> => {
    if (isNullOrUndefined(value)
      || (exclusive ? value.length > minLength : value.length >= minLength) !== negate)
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.minLength(minLength);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
