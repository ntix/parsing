import { IRoot } from './parsing';
/** Starting point for a new parsing and validating */
export declare class Is {
    private constructor();
    static readonly required: IRoot.Parser;
    static readonly boolean: import("./parsing").IBoolean.Parser;
    static readonly int: import("./parsing").IInt.Parser;
    static readonly float: import("./parsing").IFloat.Parser;
    static readonly date: import("./parsing").IDate.Parser;
    static readonly string: import("./parsing").IString.Parser;
    static readonly array: import("./parsing").IArray.Parser<unknown>;
    static readonly for: <T>(schema: import("./parsing").ComplexSchema<T>) => import("./parsing").IComplex.Parser<T>;
    static readonly use: <T>(parser: import("./parsing").IParser<T>) => {
        parse: import("./parsing").IParse<T>;
    };
}
