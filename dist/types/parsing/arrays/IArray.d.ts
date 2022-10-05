import { IParser } from '../IParser';
/** Fluent API interfaces for arrays */
export declare namespace IArray {
    interface Parser<T> extends IParser<T[]>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        readonly minLength: <T>(value: number, exclusive?: boolean) => MinParser<T>;
        readonly maxLength: <T>(value: number, exclusive?: boolean) => MaxParser<T>;
        readonly rangeLength: <T>(min: number, max: number, exclusive?: boolean) => RangeParser<T>;
        readonly each: <T>(parser: IParser<T>) => IParser<T[]>;
    }
    interface MinParser<T> extends EachParser<T> {
    }
    interface MaxParser<T> extends EachParser<T> {
    }
    interface RangeParser<T> extends EachParser<T> {
    }
    interface EachParser<T> extends IParser<T[]> {
        readonly each: <T>(parser: IParser<T>) => IParser<T[]>;
    }
}
