import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { IArray } from './IArray';
export declare class ArrayParser<T> implements IArray.Parser {
    private parent;
    private parseCurrent;
    private negate;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<T[]>, negate?: boolean);
    readonly parse: IParse<T[]>;
    readonly minLength: (minValue: number, exclusive?: boolean) => ArrayParser<T>;
    readonly maxLength: (maxValue: number, exclusive?: boolean) => ArrayParser<T>;
    readonly rangeLength: (minValue: number, maxValue: number, exclusive?: boolean) => ArrayParser<T>;
    readonly each: <T_1>(parser: IParser<T_1>) => {
        parse: IParse<T_1[]>;
    };
    get not(): ArrayParser<T>;
}
