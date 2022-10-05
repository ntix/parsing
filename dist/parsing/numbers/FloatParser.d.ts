import { IParser } from '../IParser';
import { IFloat } from './IFloat';
import { NumberParsableTypes } from './NumberParsableTypes';
import { IParse } from '../IParse';
/**
 * Fluent builder for parsing floats
 */
export declare class FloatParser implements IFloat.Parser {
    private parent;
    private parseCurrent;
    private negate;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<number>, negate?: boolean);
    readonly parse: IParse<number>;
    readonly equals: (value: NumberParsableTypes) => FloatParser;
    readonly anyOf: (values: NumberParsableTypes[]) => FloatParser;
    readonly min: (value: NumberParsableTypes, exclusive?: boolean) => FloatParser;
    readonly max: (value: NumberParsableTypes, exclusive?: boolean) => FloatParser;
    readonly range: (min: NumberParsableTypes, max: NumberParsableTypes, exclusive?: boolean) => FloatParser;
    get not(): FloatParser;
}
