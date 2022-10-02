import { isNullOrEmpty, isInt } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { MaxParser } from '../MaxParser';
import { MinParser } from '../MinParser';
import { NumberArrayOrEnumMap } from './NumberArrayOrEnumMap';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';
import { AnyOfValidator } from '../AnyOfValidator';
import { ensureNumbersArray } from './ensureNumbersArray';
import { IIntParser } from './IIntParser';

/**
 * Fluent builder for parsing ints
 */
export class IntParser implements IIntParser {
  constructor(public parent: IParser<any>, public radix: number = undefined, public negate: boolean = false) {}

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

    if (isInt(value)) return createParseResult(Number.parseInt(value, this.radix));

    return createParseResult(null, ParseErrors.int);
  });

  readonly equals = (value: number) => new EqualsValidator<number>(this, value, this.negate);
  readonly withRadix = (value?: number) => new IntParser(this.parent, value, this.negate);
  readonly anyOf = (valuesOrEnum: NumberArrayOrEnumMap) =>
    new AnyOfValidator(this, ensureNumbersArray(valuesOrEnum), this.negate);
  readonly min = (value: number) => new MinParser(this, value, this.negate);
  readonly max = (value: number) => new MaxParser(this, value, this.negate);

  get not() {
    return new IntParser(this.parent, this.radix, true);
  }
}
