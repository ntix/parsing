import { isEqual, isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';

export function provideEquals<T>(
  equalToValue: T, negate: boolean
) {

  return (value: T) => {
    if (isNullOrEmpty(value) || isEqual(value, equalToValue) !== negate)
      return createParseResult(value);

    let errors: IParseErrors = ParseErrors.equals(equalToValue);
    if (negate)
      errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  };
}
