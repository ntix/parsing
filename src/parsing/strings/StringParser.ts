import { isNullOrEmpty, isStringType } from '../../predicates';
import { AnyOfValidator } from '../AnyOfValidator';
import { createParseResult } from '../createParseResult';
import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { IStringBuilder } from './IStringBuilder';

/**
 * Fluent builder for parsing strings
 */
export class StringParser implements IStringBuilder {
  constructor(public parent: IParser<any>, public negate: boolean = false) {}

  /**
   * Attempt to parse a value to a string
   *
   * Note: if the value fails to parse, null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns a string or null
   */
  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);
    if (isStringType(value)) return createParseResult(value);

    return createParseResult(value.toString());
  });

  readonly equals = (value: string) => new EqualsValidator<string>(this, value, this.negate);
  readonly anyOf = (values: string[]) => new AnyOfValidator(this, values, this.negate);

  get not() {
    return new StringParser(this.parent, true);
  }
}
