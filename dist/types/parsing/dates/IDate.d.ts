import { IParser } from '../IParser';
import { DateParsableTypes } from './DateParsableTypes';
/** Fluent API interfaces for dates */
export declare namespace IDate {
    interface Parser extends IParser<Date>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        equals(value: DateParsableTypes): EqualsParser;
        anyOf(values: DateParsableTypes[]): AnyOfParser;
        min(value: DateParsableTypes, exclusive?: boolean): MinParser;
        max(value: DateParsableTypes, exclusive?: boolean): MaxParser;
        range(min: DateParsableTypes, max: DateParsableTypes, exclusive?: boolean): RangeParser;
    }
    interface EqualsParser extends IParser<Date> {
    }
    interface AnyOfParser extends IParser<Date> {
    }
    interface MinParser extends IParser<Date> {
    }
    interface MaxParser extends IParser<Date> {
    }
    interface RangeParser extends IParser<Date> {
    }
}
