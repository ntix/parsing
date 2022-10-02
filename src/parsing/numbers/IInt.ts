import { IParser } from '../IParser';
import { NumberEnumMap } from './NumberEnumMap';
import { NumberParsableTypes } from './NumberParsableTypes';

export namespace IInt {

  export interface Parser extends IParser<number>, Builder {
    readonly not: Builder;
  }

  export interface Builder {

    withRadix: (value?: number) => Parser;

    equals(value: NumberParsableTypes): EqualsParser;
    anyOf(values: NumberParsableTypes[] | NumberEnumMap): AnyOfParser;
    min(value: NumberParsableTypes, exclusive?: boolean): MinParser;
    max(value: NumberParsableTypes, exclusive?: boolean): MaxParser;
    range(min: NumberParsableTypes, max: NumberParsableTypes, exclusive?: boolean): RangeParser;
  }

  export interface EqualsParser extends IParser<number> { }
  export interface AnyOfParser extends IParser<number> { }
  export interface MinParser extends IParser<number> { }
  export interface MaxParser extends IParser<number> { }
  export interface RangeParser extends IParser<number> { }
}
