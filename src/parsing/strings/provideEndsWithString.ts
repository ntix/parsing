import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideEndsWithString(
  endswithValue: string, ignoreCase: boolean, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? endswithValue.toLowerCase() : endswithValue;

    if (a.endsWith(b) !== negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.endsWith(endswithValue))
      : ParseErrors.endsWith(endswithValue);

    return createParseResult(value, errors);
  };
}
