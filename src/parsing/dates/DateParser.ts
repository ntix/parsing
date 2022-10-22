import { IParser } from '../IParser';
import { provideMax } from '../provideMax';
import { parseChain } from '../parseChain';
import { IParse } from '../IParse';
import { provideEquals } from '../provideEquals';
import { provideMin } from '../provideMin';
import { provideAnyOf } from '../provideAnyOf';
import { ensureDateArray } from './ensureDateArray';
import { IDate } from './IDate';
import { parseDate } from './parseDate';
import { DateParsableTypes } from './DateParsableTypes';
import { provideParseDate } from './provideParseDate';

/**
 * Fluent builder for parsing dates
 */
export class DateParser implements IDate.Parser {
  static DefaultFormat = new Intl.DateTimeFormat();

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<Date> = provideParseDate(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent);
  readonly equals = (value: DateParsableTypes) => new DateParser(this, provideEquals(parseDate(value), this.negate));
  readonly anyOf = (values: DateParsableTypes[]) => new DateParser(this, provideAnyOf(ensureDateArray(values), this.negate));
  readonly min = (value: DateParsableTypes, exclusive = false) => new DateParser(this, provideMin(parseDate(value), exclusive, this.negate));
  readonly max = (value: DateParsableTypes, exclusive = false) => new DateParser(this, provideMax(parseDate(value), exclusive, this.negate));

  get not() {
    return new DateParser(this.parent, this.parseCurrent, true);
  }
}
