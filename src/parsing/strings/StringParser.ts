import { isNullOrEmpty, isStringType } from '../../predicates';
import { AnyOfValidator } from '../AnyOfValidator';
import { createParseResult } from '../createParseResult';
import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { MaxLengthParser } from '../MaxLengthParser';
import { MinLengthParser } from '../MinLengthParser';
import { parseChain } from '../parseChain';
import { IStringParser } from './IStringParser';

/**
 * Fluent builder for parsing strings
 */
export class StringParser implements IStringParser {
  constructor(public parent: IParser<any>, public negate: boolean = false) {}

  /**
   * Attempt to parse a value to a string
   *
   * Note: if the value fails to parse, null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns a string or null
   */
  readonly parse = parseChain(this.parent, (value: any) => {
    if (isNullOrEmpty(value)) return createParseResult(null);
    if (isStringType(value)) return createParseResult(value);

    return createParseResult(value.toString());
  });

  readonly equals = (value: string) => new EqualsValidator<string>(this, value, this.negate);
  readonly anyOf = (values: string[]) => new AnyOfValidator(this, values, this.negate);
  readonly minLength = (value: number) => new MinLengthParser<string>(this, value, this.negate);
  readonly maxLength = (value: number) => new MaxLengthParser<string>(this, value, this.negate);

  get not() {
    return new StringParser(this.parent, true);
  }
}

// TODO: look to refactor parsers as functional parameters
// export interface IStringParser extends IParser<string> {

//   equals(value: string): IParser<string>;
//   anyOf(values: string[]): IStringParserAnyOf;
//   minLength(value: number): IParser<string> & IMaxLengthBuilder<string> & IAnyOfBuilder<string>;
//   maxLength(value: number): IParser<string> & IMinLengthBuilder<string> & IAnyOfBuilder<string>;
// }

// export interface IStringParserAnyOf extends IParser<string> {
//   minLength(value: number): IParser<string> & IMaxLengthBuilder<string>;
//   maxLength(value: number): IParser<string> & IMinLengthBuilder<string>;
// }
