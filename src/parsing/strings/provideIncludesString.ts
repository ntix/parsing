import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideIncludesString(
  includesValue: string, ignoreCase = false, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? includesValue.toLowerCase() : includesValue;

    if (a.includes(b) !== negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.includes(includesValue))
      : ParseErrors.includes(includesValue);

    return createParseResult(value, errors);
  };
}
