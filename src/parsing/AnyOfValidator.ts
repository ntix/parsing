import { isEqual, isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';

export class AnyOfValidator<T> implements IParser<T> {
  constructor(private parent: IParser<any>, private values: T[], private negate: boolean) { }

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    if (this.values.some((v) => isEqual(v, value)) === !this.negate)
      return createParseResult(value);

    const errors = this.negate
      ? ParseErrors.not(ParseErrors.anyOf(this.values))
      : ParseErrors.anyOf(this.values);

    return createParseResult(value, errors);
  });
}
