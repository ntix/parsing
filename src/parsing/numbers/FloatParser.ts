import { IParser } from '../IParser';
import { EqualsValidator } from '../EqualsValidator';
import { MaxValidator } from '../MaxValidator';
import { MinValidator } from '../MinValidator';
import { parseChain } from '../parseChain';
import { isNullOrEmpty, isFloat } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { AnyOfValidator } from '../AnyOfValidator';

/**
 * Fluent builder for parsing floats
 */
export class FloatParser implements IParser<number> {
  constructor(private parent: IParser<any>) {}

  /**
   * Attempt to parse a value to a float
   *
   * Note: if the value fails to parse, null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns a float or null
   */
  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    if (isFloat(value)) return createParseResult(Number.parseFloat(value));

    return createParseResult(null, ParseErrors.float);
  });
  readonly equals = (value: number) => new EqualsValidator(this, value);
  readonly anyOf = (values: number[]) => new AnyOfValidator(this, values);
  readonly min = (value: number) => new MinValidator(this, value);
  readonly max = (value: number) => new MaxValidator(this, value);
}
