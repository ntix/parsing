import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideParseString() {
  return (value: unknown): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    return createParseResult(value.toString());
  };
}

export function provideIncludesString(
  includesValue: string, caseSensitive = false, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    if (!caseSensitive) {
      value = value.toLowerCase();
      includesValue = includesValue.toLocaleLowerCase();
    }

    if (value.includes(includesValue) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.includes(value, caseSensitive));
  };
}
