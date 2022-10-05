import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { IString } from './IString';
/**
 * Fluent builder for parsing strings
 */
export declare class StringParser implements IString.Parser {
    private parent;
    private parseCurrent;
    private negate;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<string>, negate?: boolean);
    readonly parse: IParse<string>;
    readonly equals: (value: string, ignoreCase?: boolean) => StringParser;
    readonly anyOf: (values: string[], ignoreCase?: boolean) => StringParser;
    readonly minLength: (value: number, exclusive?: boolean) => StringParser;
    readonly maxLength: (value: number, exclusive?: boolean) => StringParser;
    readonly rangeLength: (min: number, max: number, exclusive?: boolean) => StringParser;
    readonly matches: (value: string | RegExp, name?: string) => StringParser;
    readonly includes: (value: string, ignoreCase?: boolean) => StringParser;
    readonly startsWith: (value: string, ignoreCase?: boolean) => StringParser;
    readonly endsWith: (value: string, ignoreCase?: boolean) => StringParser;
    get not(): StringParser;
}
