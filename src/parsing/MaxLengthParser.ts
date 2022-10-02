import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';
import { IHasLength } from './IHasLength';
import { MinLengthParser } from './MinLengthParser';
import { IMinLengthBuilder } from './IMinLengthBuilder';

/**
 * Validate a value length is a maximum
 */
export class MaxLengthParser<T extends IHasLength> implements IParser<T>, IMinLengthBuilder<T> {
  constructor(private parent: IParser<T>, private maxLength: number, private negate: boolean = false) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value) || value.length <= this.maxLength !== this.negate) return createParseResult(value);

    let errors: IParseErrors = ParseErrors.maxLength(this.maxLength);
    if (this.negate) errors = ParseErrors.not(errors);

    return createParseResult(value, errors);
  });

  readonly minLength = (value: number) => new MinLengthParser<T>(this, value, this.negate);
}
