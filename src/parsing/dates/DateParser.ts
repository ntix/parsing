import { IParser } from '../IParser';
import { MaxValidator } from '../MaxValidator';
import { MinValidator } from '../MinValidator';
import { parse } from '../parse';
import { DateEqualsValidator } from './DateEqualsValidator';
import { isNullOrEmpty, isDateType, isDate } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseDate } from './tryParseDate';

/**
 * Fluent builder for parsing dates
 */
export class DateParser implements IParser<Date> {
  static DefaultFormat = new Intl.DateTimeFormat();
  constructor(private parent: IParser<any>) {}

  /**
   * Attempt to parse a value to a date
   *
   * Note: if the value fails to parse null is passed on to any child parser
   *
   * @param value to be parsed
   * @returns a date or null
   */
  readonly parse = parse(this.parent, (value) => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    if (isDateType(value)) return createParseResult(value);
    if (isDate(value)) return createParseResult(tryParseDate(value));

    return createParseResult(null, ParseErrors.date);
  });
  readonly equals = (value: Date, formatter?: Intl.DateTimeFormat) =>
    new DateEqualsValidator(this, value, formatter);
  readonly min = (value: Date) => new MinValidator(this, value);
  readonly max = (value: Date) => new MaxValidator(this, value);
}
