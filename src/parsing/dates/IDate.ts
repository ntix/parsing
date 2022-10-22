import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';
import { DateParsableTypes } from './DateParsableTypes';

/** Fluent API interfaces for dates */
export namespace IDate {
  export interface Parser extends IParser<Date> {
    readonly not: NextBuilder<Parser, 'not' | 'parse'>;

    equals(value: DateParsableTypes): NextBuilder<Parser, 'equals', 'not' | 'parse'>;
    anyOf(values: DateParsableTypes[]): NextBuilder<Parser, 'anyOf', 'not' | 'parse'>;

    min(value: DateParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'min', 'not' | 'parse'>;
    max(value: DateParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'max', 'not' | 'parse'>;
  }
}
