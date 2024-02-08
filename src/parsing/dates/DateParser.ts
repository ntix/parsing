import { IParser } from '../IParser';
import { provideMax } from '../provideMax';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { provideEquals } from '../provideEquals';
import { provideMin } from '../provideMin';
import { provideAnyOf } from '../provideAnyOf';
import { ensureDateArray } from './ensureDateArray';
import { IDate } from './IDate';
import { parseDate } from './parseDate';
import { DateParsableTypes } from './DateParsableTypes';
import { asCurrent } from '../asCurrent';

/**
 * Fluent builder for parsing dates
 */
export class DateParser implements IDate.Parser {
  static DefaultFormat = new Intl.DateTimeFormat();

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<Date>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'DATE');

  get not() {
    return new DateParser(this.parent, this.parseCurrent, !this.negate);
  }

  readonly equals = (value: DateParsableTypes) => new DateParser(this, asCurrent(provideEquals(parseDate(value)), this.negate));
  readonly anyOf = (values: DateParsableTypes[]) => new DateParser(this, asCurrent(provideAnyOf(ensureDateArray(values)), this.negate));
  readonly min = (value: DateParsableTypes, exclusive = false) => new DateParser(this, asCurrent(provideMin(parseDate(value), exclusive), this.negate));
  readonly max = (value: DateParsableTypes, exclusive = false) => new DateParser(this, asCurrent(provideMax(parseDate(value), exclusive), this.negate));
}
