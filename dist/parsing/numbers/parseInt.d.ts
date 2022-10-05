import { NumberParsableTypes } from './NumberParsableTypes';
/**
 * Parse the value passed
 *
 * @param value a parsable number type
 * @param radix base (2-36) defaults to 10 for decimal
 * @returns number or throws if not
 */
export declare function parseInt(value: NumberParsableTypes, radix: number): number;
