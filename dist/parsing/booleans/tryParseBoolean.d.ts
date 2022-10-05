/** values considered to be a boolean true */
export declare const BOOLEANS_TRUE: (string | number)[];
/** values considered to be a boolean false */
export declare const BOOLEANS_FALSE: (string | number)[];
/**
 * try and parse the value as a boolean
 *
 * @param value value to parse
 * @returns boolean or a null if failed parse
 */
export declare function tryParseBoolean(value: unknown): boolean | null;
