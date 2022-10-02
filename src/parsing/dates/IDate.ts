import { IParser } from '../IParser';
import { DateParsableTypes } from './DateParsableTypes';

/** Fluent API interfaces for dates */
export namespace IDate {
  export interface Parser extends IParser<Date>, Builder {
    readonly not: Builder
  }

  export interface Builder {
    equals(value: DateParsableTypes): EqualsParser
    anyOf(values: DateParsableTypes[]): AnyOfParser
    min(value: DateParsableTypes, exclusive?: boolean): MinParser
    max(value: DateParsableTypes, exclusive?: boolean): MaxParser
    range(min: DateParsableTypes, max: DateParsableTypes, exclusive?: boolean): RangeParser
  }

  export interface EqualsParser extends IParser<Date> { }
  export interface AnyOfParser extends IParser<Date> { }
  export interface MinParser extends IParser<Date> { }
  export interface MaxParser extends IParser<Date> { }
  export interface RangeParser extends IParser<Date> { }
}
