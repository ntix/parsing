import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideStartsWithString(
  startswithValue: string, ignoreCase: boolean, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrUndefined(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? startswithValue.toLowerCase() : startswithValue;

    if (a.startsWith(b) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.startsWith(value, ignoreCase));
  };
}
