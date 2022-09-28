import { isNullOrEmpty, isInt } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { MaxValidator } from '../MaxValidator';
import { MinValidator } from '../MinValidator';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';

/**
 * Fluent builder for parsing ints
 */
export class IntParser implements IParser<number> {
  constructor(private parent: IParser<any>, private radix: number = 10) {}

  /**
   * Attempt to parse a value to an int
   *
   * Note: if the value fails to parse, null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns an int or null
   */
  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    if (isInt(value))
      return createParseResult(Number.parseInt(value, this.radix));

    return createParseResult(null, ParseErrors.int(this.radix));
  });
  readonly equals = (value: number) => new EqualsValidator(this, value, true);
  readonly min = (value: number) => new MinValidator(this, value);
  readonly max = (value: number) => new MaxValidator(this, value);
}
