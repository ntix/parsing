import { isNullOrEmpty } from '../../predicates';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';
import { tryParseJson } from './tryParseJson';

export function provideParseJson<T>(
  negate: boolean = false
) {

  return (value: T): IParseResult<T> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const parsed = tryParseJson<T>(value);

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.json)
      : ParseErrors.json;

    return createParseResult(null, errors);
  };
}
