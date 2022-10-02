import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';
import { MinParser } from './MinParser';
import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';

/**
 * Validate a value is a maximum
 */
export class MaxParser<T extends RelationalValidatorTypes> implements IParser<T> {
  constructor(private parent: IParser<T>, private max: T, private negate: boolean = false) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value) || value <= this.max !== this.negate) return createParseResult(value);

    let errors: IParseErrors = ParseErrors.max(this.max);
    if (this.negate) errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  });

  readonly min = (value: T) => new MinParser(this, value, this.negate);
}
