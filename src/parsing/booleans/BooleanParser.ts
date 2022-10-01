import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';
import { IBooleanParser } from './IBooleanParser';
import { tryParseBoolean } from './tryParseBoolean';

/**
 * Fluent builder for parsing strings
 */
export class BooleanParser implements IBooleanParser {
  constructor(private parent: IParser<any>, public negate: boolean = false) {}

  /**
   * Attempt to parse a value to a boolean
   *
   * Note: if the value fails to parse, null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns a boolean or null
   */
  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    value = tryParseBoolean(value);
    if (value === null) return createParseResult(null, ParseErrors.boolean);

    return createParseResult(value);
  });

  equals = (value: boolean) => new EqualsValidator<boolean>(this, value, this.negate);

  get not() {
    return new BooleanParser(this.parent, true);
  }
}
