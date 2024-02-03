import { isNullOrEmpty } from '../../predicates';
import { isObject } from '../../predicates/isObject';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { Dictionary } from './Dictionary';

export function provideParseDictionary<T>(
  negate: boolean = false
) {

  return (value: T): IParseResult<Dictionary<T>> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const parsed = isObject(value)
      ? value as Dictionary<T>
      : null;

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.dictionary)
      : ParseErrors.dictionary;

    return createParseResult(null, errors);
  };
}
