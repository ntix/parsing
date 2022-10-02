import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IHasLength } from './IHasLength';
import { IMaxLengthBuilder } from './IMaxLengthBuilder';
import { IParseErrors } from './IParseErrors';
import { IParser } from './IParser';
import { MaxLengthParser } from './MaxLengthParser';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';

/**
 * Validate a value length is a minimum
 */

export class MinLengthParser<T extends IHasLength> implements IParser<T>, IMaxLengthBuilder<T> {
  constructor(private parent: IParser<T>, private minLength: number, private negate: boolean = false) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value) || value.length >= this.minLength !== this.negate) return createParseResult(value);

    let errors: IParseErrors = ParseErrors.minLength(this.minLength);
    if (this.negate) errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  });

  readonly maxLength = (value: number) => new MaxLengthParser<T>(this, value, this.negate);
}
