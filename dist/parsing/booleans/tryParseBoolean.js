import { isBooleanType, isNullOrEmpty, isStringType } from '../../predicates';
/** values considered to be a boolean true */
export const BOOLEANS_TRUE = [1, '1', 'true', 'on'];
/** values considered to be a boolean false */
export const BOOLEANS_FALSE = [0, '0', 'false', 'off'];
/**
 * try and parse the value as a boolean
 *
 * @param value value to parse
 * @returns boolean or a null if failed parse
 */
export function tryParseBoolean(value) {
    if (isNullOrEmpty(value))
        return null;
    if (isBooleanType(value))
        return value;
    if (isStringType(value))
        value = value.toLowerCase();
    if (BOOLEANS_TRUE.includes(value))
        return true;
    if (BOOLEANS_FALSE.includes(value))
        return false;
    return null;
}
