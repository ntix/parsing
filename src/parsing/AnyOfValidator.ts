import { isEqual, isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';

export class AnyOfValidator<T> implements IParser<T> {
  constructor(private parent: IParser<any>, private values: T[]) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    return this.values.some((v) => isEqual(v, value))
      ? createParseResult(value)
      : createParseResult(value, ParseErrors.anyOf(this.values));
  });
}
