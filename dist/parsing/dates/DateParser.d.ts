import { IParser } from '../IParser';
import { IParse } from '../IParse';
import { IDate } from './IDate';
import { DateParsableTypes } from './DateParsableTypes';
/**
 * Fluent builder for parsing dates
 */
export declare class DateParser implements IDate.Parser {
    private parent;
    private parseCurrent;
    private negate;
    static DefaultFormat: Intl.DateTimeFormat;
    constructor(parent: IParser<unknown>, parseCurrent?: IParse<Date>, negate?: boolean);
    readonly parse: IParse<Date>;
    readonly equals: (value: DateParsableTypes) => DateParser;
    readonly anyOf: (values: DateParsableTypes[]) => DateParser;
    readonly min: (value: DateParsableTypes, exclusive?: boolean) => DateParser;
    readonly max: (value: DateParsableTypes, exclusive?: boolean) => DateParser;
    readonly range: (min: DateParsableTypes, max: DateParsableTypes, exclusive?: boolean) => DateParser;
    get not(): DateParser;
}
