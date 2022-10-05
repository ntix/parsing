import { RelationalValidatorTypes } from './RelationalValidatorTypes';
/**
 * Validate a value is a maximum
 */
export declare function provideMax<T extends RelationalValidatorTypes>(maxValue: T, exclusive: boolean, negate: boolean): (value: T) => import("./IParseResult").IParseResult<T>;
