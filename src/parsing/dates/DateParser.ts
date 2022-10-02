import { isNullOrEmpty, isDateType, isDate } from '../../predicates';
import { IParser } from '../IParser';
import { MaxParser } from '../MaxParser';
import { MinParser } from '../MinParser';
import { parseChain } from '../parseChain';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseDate } from './tryParseDate';
import { AnyOfValidator } from '../AnyOfValidator';
import { ensureDateArray } from './ensureDateArray';
import { EqualsValidator } from '../EqualsValidator';
import { IDateParser } from './IDateParser';
import { parseDate } from './parseDate';
import { DateParsable } from './DateParsable';

/**
 * Fluent builder for parsing dates
 */
export class DateParser implements IDateParser {
  static DefaultFormat = new Intl.DateTimeFormat();
  constructor(private parent: IParser<any>, public negate: boolean = false) {}

  /**
   * Attempt to parse a value to a date
   *
   * Note: if the value fails to parse null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns a date or null
   */
  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    if (isDateType(value)) return createParseResult(value);
    if (isDate(value)) return createParseResult(tryParseDate(value));

    return createParseResult(null, ParseErrors.date);
  });

  readonly equals = (value: Date) => new EqualsValidator<Date, DateParsable>(this, parseDate(value), this.negate);
  readonly anyOf = (values: DateParsable[]) => new AnyOfValidator(this, ensureDateArray(values), this.negate);
  readonly min = (value: Date) => new MinParser<Date>(this, parseDate(value), this.negate);
  readonly max = (value: Date) => new MaxParser<Date>(this, parseDate(value), this.negate);

  get not() {
    return new DateParser(this.parent, true);
  }
}
