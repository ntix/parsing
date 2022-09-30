import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';
import { tryParseBoolean } from './tryParseBoolean';

/**
 * Fluent builder for parsing booleans
 */
export class BooleanParser implements IParser<boolean> {
  constructor(private parent: IParser<any>) {}

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
  readonly equals = (value: boolean) => new EqualsValidator(this, value);
}
