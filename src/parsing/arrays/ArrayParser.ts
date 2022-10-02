import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParser } from '../IParser';
import { MaxLengthParser } from '../MaxLengthParser';
import { MinLengthParser } from '../MinLengthParser';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';
import { IArrayParser } from './IArrayParser';

export class ArrayParser implements IArrayParser {
  constructor(private parent: IParser<any>, private negate: boolean = false) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(value);

    if (Array.isArray(value) !== this.negate) return createParseResult(value);

    return createParseResult(null, ParseErrors.array);
  });

  readonly minLength = (value: number) => new MinLengthParser<any[]>(this, value, this.negate);
  readonly maxLength = (value: number) => new MaxLengthParser<any[]>(this, value, this.negate);
}
