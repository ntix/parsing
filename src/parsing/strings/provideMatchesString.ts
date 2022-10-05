import { isNullOrEmpty, isStringType } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideMatchesString(
  matchValue: string | RegExp, name: string, negate: boolean
) {

  return (value: string): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const re = isStringType(matchValue)
      ? new RegExp(matchValue)
      : matchValue;

    if (re.test(value) !== negate)
      return createParseResult(value);

    return createParseResult(value, ParseErrors.matches(name ?? matchValue));
  };
}
