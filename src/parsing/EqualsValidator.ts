import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { isEqual, isNullOrEmpty } from '../predicates';
import { ParseErrors } from './ParseErrors';
import { IParseErrors } from './IParseErrors';
import { createParseResult } from './createParseResult';

/**
 * Fluent builder for parsing strings
 */
export class EqualsValidator<T, TIn = T> implements IParser<T> {
  constructor(private parent: IParser<T>, private equalToValue: TIn, private negate: boolean) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value) || isEqual(value, this.equalToValue) !== this.negate) return createParseResult(value);

    let errors: IParseErrors = ParseErrors.equals(this.equalToValue);
    if (this.negate) errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  });
}
