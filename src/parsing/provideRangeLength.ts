import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { IHasLength } from './IHasLength';
import { IParseResult } from './IParseResult';

export function provideRangeLength<T extends IHasLength>(
  minLength: number, maxLength: number, exclusive: boolean, negate: boolean
) {

  return (value: T): IParseResult<T> => {
    if (isNullOrEmpty(value)
      || (
        (exclusive ? value.length > minLength : value.length >= minLength)
        && (exclusive ? value.length < maxLength : value.length <= maxLength)
      ) !== negate)
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.rangeLength(minLength, maxLength, exclusive);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
