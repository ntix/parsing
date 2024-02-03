import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseBoolean } from './tryParseBoolean';

export function provideParseBoolean(
  negate: boolean = false
) {
  return (value: unknown): IParseResult<boolean> => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    const parsed = tryParseBoolean(value);

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.boolean)
      : ParseErrors.boolean;

    return createParseResult(null, errors);
  };
}
