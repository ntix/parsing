import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { IBoolean } from './IBoolean';
/**
 * Fluent builder for parsing booleans
 */
export declare class BooleanParser implements IBoolean.Parser {
    private parent;
    private parseCurrent;
    private negate;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<boolean>, negate?: boolean);
    readonly parse: IParse<boolean>;
    readonly equals: (equalToValue: boolean) => BooleanParser;
    get not(): BooleanParser;
}
