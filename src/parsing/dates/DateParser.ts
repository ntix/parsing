import { IParser } from '../IParser';
import { MaxValidator } from '../MaxValidator';
import { MinValidator } from '../MinValidator';
import { parse } from '../parse';
import { parseDate } from './parseDate';
import { DateEqualsValidator } from './DateEqualsValidator';

/**
 * Fluent builder for parsing dates
 */
export class DateParser implements IParser<Date> {
  static DefaultFormat = new Intl.DateTimeFormat();
  constructor(private parent: IParser<any>) {}

  readonly parse = parse(this.parent, (v) => parseDate(v));
  readonly equals = (value: Date, formatter?: Intl.DateTimeFormat) =>
    new DateEqualsValidator(this, value, formatter);
  readonly min = (value: Date) => new MinValidator(this, value);
  readonly max = (value: Date) => new MaxValidator(this, value);
}
