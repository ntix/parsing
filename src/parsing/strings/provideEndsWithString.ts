import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideEndsWithString(
  endswithValue: string, caseSensitive :boolean, negate:boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    if (!caseSensitive) {
      value = value.toLowerCase();
      endswithValue = endswithValue.toLocaleLowerCase();
    }

    if (value.endsWith(endswithValue) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.endsWith(value, caseSensitive));
  };
}
