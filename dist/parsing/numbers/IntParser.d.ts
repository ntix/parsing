import { IParser } from '../IParser';
import { NumberParsableTypes } from './NumberParsableTypes';
import { IParse } from '../IParse';
import { IInt } from './IInt';
import { NumberEnumMap } from './NumberEnumMap';
/**
 * Fluent builder for parsing ints
 */
export declare class IntParser implements IInt.Parser {
    private parent;
    private parseCurrent;
    private radix;
    private negate;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<number>, radix?: number, negate?: boolean);
    readonly parse: IParse<number>;
    readonly withRadix: (value?: number) => IntParser;
    readonly equals: (value: NumberParsableTypes) => IntParser;
    readonly anyOf: (values: NumberParsableTypes[] | NumberEnumMap) => IntParser;
    readonly min: (value: NumberParsableTypes, exclusive?: boolean) => IntParser;
    readonly max: (value: NumberParsableTypes, exclusive?: boolean) => IntParser;
    readonly range: (min: NumberParsableTypes, max: NumberParsableTypes, exclusive?: boolean) => IntParser;
    get not(): IntParser;
}
