import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { IParser } from './IParser';
import { MaxParser } from './MaxParser';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Validate a value is a minimum
 */
export class MinParser<T extends RelationalValidatorTypes> implements IParser<T> {
  constructor(private parent: IParser<T>, private min: T, private negate: boolean = false) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value) || value >= this.min !== this.negate) return createParseResult(value);

    let errors: IParseErrors = ParseErrors.min(this.min);
    if (this.negate) errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  });

  readonly max = (value: T) => new MaxParser<T>(this, value, this.negate);
}
