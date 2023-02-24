import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideEndsWithString(
  endswithValue: string, ignoreCase :boolean, negate:boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrUndefined(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? endswithValue.toLowerCase() : endswithValue;

    if (a.endsWith(b) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.endsWith(value, ignoreCase));
  };
}
