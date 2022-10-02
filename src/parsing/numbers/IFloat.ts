import { IParser } from '../IParser';
import { NumberParsableTypes } from './NumberParsableTypes';

/** Fluent API interfaces for floats */
export namespace IFloat {

  export interface Parser extends IParser<number>, Builder {
    readonly not: Builder;
  }

  export interface Builder {
    equals(value: NumberParsableTypes): EqualsParser;
    anyOf(values: NumberParsableTypes[]): AnyOfParser;
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
