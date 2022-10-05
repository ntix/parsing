import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { IArray } from './IArray';
export declare class ArrayParser<T> implements IArray.Parser<T> {
    private parent;
    private parseCurrent;
    private negate;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<T[]>, negate?: boolean);
    readonly parse: IParse<T[]>;
    readonly minLength: <T_1>(minValue: number, exclusive?: boolean) => ArrayParser<T_1>;
    readonly maxLength: <T_1>(maxValue: number, exclusive?: boolean) => ArrayParser<T_1>;
    readonly rangeLength: <T_1>(minValue: number, maxValue: number, exclusive?: boolean) => ArrayParser<T_1>;
    readonly each: <T_1>(parser: IParser<T_1>) => {
        parse: IParse<T_1[]>;
    };
    get not(): ArrayParser<T>;
}
