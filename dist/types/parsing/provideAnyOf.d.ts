/**
 * Validate a value is any of values passed
 */
export declare function provideAnyOf<T>(values: T[], negate: boolean): (value: T) => import("./IParseResult").IParseResult<any>;
