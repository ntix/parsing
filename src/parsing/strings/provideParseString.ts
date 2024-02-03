import { isNullOrEmpty, isStringType } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';

export function provideParseString(negate: boolean = false) {

  return (value: unknown): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const parsed = isStringType(value)
      ? value.toString()
      : null;

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.string)
      : ParseErrors.string;

    return createParseResult(null, errors);
  };
}