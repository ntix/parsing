import { IParser } from '../IParser';

/** Fluent API interfaces for arrays */
export namespace IArray {

  export interface Parser<T> extends IParser<T[]>, Builder {
    readonly not: Builder
  }

  export interface Builder {
    readonly minLength: <T>(value: number, exclusive?: boolean) => MinParser<T>
    readonly maxLength: <T>(value: number, exclusive?: boolean) => MaxParser<T>
    readonly rangeLength: <T>(min: number, max: number, exclusive?: boolean) => RangeParser<T>
    readonly each: <T>(parser: IParser<T>) => IParser<T[]>
  }

  export interface MinParser<T> extends EachParser<T> { }
  export interface MaxParser<T> extends EachParser<T> { }
  export interface RangeParser<T> extends EachParser<T> { }

  export interface EachParser<T> extends IParser<T[]> {
    readonly each: <T>(parser: IParser<T>) => IParser<T[]>
  }
}
