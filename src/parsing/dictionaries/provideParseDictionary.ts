import { isNullOrEmpty } from '../../predicates';
import { isObject } from '../../predicates/isObject';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { Dictionary } from './Dictionary';

export function provideParseDictionary<T>() {

  return (value: T): IParseResult<Dictionary<T>> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    if (isObject(value))
      return createParseResult(value as Dictionary<T>);

    return createParseResult(null, ParseErrors.dictionary);
  };
}
