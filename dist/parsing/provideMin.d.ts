import { RelationalValidatorTypes } from './RelationalValidatorTypes';
/**
 * Validate a value is a minimum
 */
export declare function provideMin<T extends RelationalValidatorTypes>(minValue: T, exclusive: boolean, negate: boolean): (value: T) => import("./IParseResult").IParseResult<T>;
