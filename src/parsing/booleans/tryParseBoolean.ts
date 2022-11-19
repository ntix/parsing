import { isBooleanType, isNullOrUndefined, isStringType } from '../../predicates';
import { Nullable } from '../Nullable';

/** values considered to be a boolean true */
export const BOOLEANS_TRUE = [1, '1', 'true', 'on'];
/** values considered to be a boolean false */
export const BOOLEANS_FALSE = [0, '0', 'false', 'off'];

/**
 * try and parse the value as a boolean
 *
 * @param value value to parse
 * @returns boolean, undefined or null
 */
export function tryParseBoolean(value: unknown): Nullable<boolean> {
  if (isNullOrUndefined(value)) return null;
  if (isBooleanType(value)) return value;

  if (isStringType(value))
    value = value.toLowerCase();

  if (BOOLEANS_TRUE.includes(value as string | number))
    return true;
  if (BOOLEANS_FALSE.includes(value as string | number))
    return false;

  return null;
}
