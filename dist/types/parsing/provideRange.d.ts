import { RelationalValidatorTypes } from './RelationalValidatorTypes';
/**
 * Validate a value is a minimum
 */
export declare function provideRange<T extends RelationalValidatorTypes>(minValue: T, maxValue: T, exclusive: boolean, negate: boolean): (value: T) => import("./IParseResult").IParseResult<T>;
