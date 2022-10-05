import { IParser } from '../IParser';
/** Fluent API interfaces for strings */
export declare namespace IString {
    interface Parser extends IParser<string>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        equals(value: string): EqualsParser;
        anyOf(values: string[]): AnyOfParser;
        minLength(value: number, exclusive?: boolean): MinLengthParser;
        maxLength(value: number, exclusive?: boolean): MaxLengthParser;
        rangeLength(min: number, max: number, exclusive?: boolean): RangeLengthParser;
    }
    interface EqualsParser extends IParser<string> {
    }
    interface AnyOfParser extends IParser<string> {
    }
    interface MinLengthParser extends IParser<string> {
    }
    interface MaxLengthParser extends IParser<string> {
    }
    interface RangeLengthParser extends IParser<string> {
    }
}
