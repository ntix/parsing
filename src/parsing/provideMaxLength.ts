import { isNullOrUndefined } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { IHasLength } from './IHasLength';
import { IParseResult } from './IParseResult';

export function provideMaxLength<T extends IHasLength>(
  maxLength: number, exclusive: boolean, negate: boolean
) {

  return (value: T): IParseResult<T> => {
    if (isNullOrUndefined(value)
      || (exclusive ? value.length < maxLength : value.length <= maxLength) !== negate)
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.maxLength(maxLength);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
