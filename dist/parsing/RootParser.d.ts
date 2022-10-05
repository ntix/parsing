import { IArray } from './arrays';
import { IBoolean } from './booleans';
import { IDate } from './dates';
import { IParser } from './IParser';
import { IRoot } from './IRootParser';
import { IFloat, IInt } from './numbers';
import { ComplexSchema, IComplex } from './complex';
import { IString } from './strings';
export declare class RootParser implements IRoot.Parser {
    private isRequried;
    constructor(isRequried?: boolean);
    readonly parse: import("./IParse").IParse<unknown>;
    readonly boolean: IBoolean.Parser;
    readonly int: IInt.Parser;
    readonly float: IFloat.Parser;
    readonly date: IDate.Parser;
    readonly string: IString.Parser;
    readonly array: IArray.Parser<unknown>;
    readonly for: <T>(schema: ComplexSchema<T>) => IComplex.Parser<T>;
    readonly use: <T>(parser: IParser<T>) => {
        parse: import("./IParse").IParse<T>;
    };
}
