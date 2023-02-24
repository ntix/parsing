import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';
import { DateParsableTypes } from './DateParsableTypes';

/** Fluent API interfaces for dates */
export namespace IDate {
  export interface Parser extends IParser<Date> {
    /** negate the parser */
    readonly not: NextBuilder<Parser, 'not' | 'parse'>;

    /** equals the passed value */
    equals(value: DateParsableTypes): NextBuilder<Parser, 'equals', 'not' | 'parse'>;
    /** one of the passed values */
    oneOf(values: DateParsableTypes[]): NextBuilder<Parser, 'oneOf', 'not' | 'parse'>;

    /** is greater or equal to passed value */
    min(value: DateParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'min', 'not' | 'parse'>;
    /** is less or equal to passed value */
    max(value: DateParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'max', 'not' | 'parse'>;
  }
}
