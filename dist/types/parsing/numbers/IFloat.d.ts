import { IParser } from '../IParser';
import { NumberParsableTypes } from './NumberParsableTypes';
/** Fluent API interfaces for floats */
export declare namespace IFloat {
    interface Parser extends IParser<number>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        equals(value: NumberParsableTypes): EqualsParser;
        anyOf(values: NumberParsableTypes[]): AnyOfParser;
        min(value: NumberParsableTypes, exclusive?: boolean): MinParser;
        max(value: NumberParsableTypes, exclusive?: boolean): MaxParser;
        range(min: NumberParsableTypes, max: NumberParsableTypes, exclusive?: boolean): RangeParser;
    }
    interface EqualsParser extends IParser<number> {
    }
    interface AnyOfParser extends IParser<number> {
    }
    interface MinParser extends IParser<number> {
    }
    interface MaxParser extends IParser<number> {
    }
    interface RangeParser extends IParser<number> {
    }
}
