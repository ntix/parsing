import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideIncludesString(
  includesValue: string, ignoreCase = false, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrUndefined(value))
      return createParseResult(null);

    if (ignoreCase) {
      value = value.toLowerCase();
      includesValue = includesValue.toLowerCase();
    }

    if (value.includes(includesValue) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.includes(value, ignoreCase));
  };
}
