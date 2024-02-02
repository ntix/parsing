import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideStartsWithString(
  startswithValue: string, ignoreCase: boolean, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? startswithValue.toLowerCase() : startswithValue;

    if (a.startsWith(b) !== negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.startsWith(startswithValue))
      : ParseErrors.startsWith(startswithValue);

    return createParseResult(value, errors);
  };
}
