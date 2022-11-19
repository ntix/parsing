import { isEqual, isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideEqualsString(
  equalToValue: string, ignoreCase: boolean, negate: boolean
) {

  return (value: string) => {
    if (isNullOrUndefined(value))
      return createParseResult(value);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? equalToValue.toLowerCase() : equalToValue;

    if (isEqual(a, b) !== negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.equals(equalToValue))
      : ParseErrors.equals(equalToValue);

    return createParseResult(value, errors);
  };
}
