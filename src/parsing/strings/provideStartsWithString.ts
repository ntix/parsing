import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideStartsWithString(
  startswithValue: string, caseSensitive:boolean, negate:boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    if (!caseSensitive) {
      value = value.toLowerCase();
      startswithValue = startswithValue.toLocaleLowerCase();
    }

    if (value.startsWith(startswithValue) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.startsWith(value, caseSensitive));
  };
}
