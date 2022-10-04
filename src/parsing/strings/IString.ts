import { IParser } from '../IParser';

/** Fluent API interfaces for strings */
export namespace IString {

  export interface Parser extends IParser<string>, Builder {
    readonly not: Builder;
  }

  export interface Builder {
    equals(value: string): EqualsParser;
    anyOf(values: string[]): AnyOfParser;
    minLength(value: number, exclusive?: boolean): MinLengthParser;
    maxLength(value: number, exclusive?: boolean): MaxLengthParser;
    rangeLength(min: number, max: number, exclusive?: boolean): RangeLengthParser;
  }

  export interface EqualsParser extends IParser<string> { }
  export interface AnyOfParser extends IParser<string> { }
  export interface MinLengthParser extends IParser<string> { }
  export interface MaxLengthParser extends IParser<string> { }
  export interface RangeLengthParser extends IParser<string> { }
}
