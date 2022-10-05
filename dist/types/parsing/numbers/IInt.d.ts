import { IParser } from '../IParser';
import { NumberEnumMap } from './NumberEnumMap';
import { NumberParsableTypes } from './NumberParsableTypes';
export declare namespace IInt {
    interface Parser extends IParser<number>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        withRadix: (value?: number) => Parser;
        equals(value: NumberParsableTypes): EqualsParser;
        anyOf(values: NumberParsableTypes[] | NumberEnumMap): AnyOfParser;
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
