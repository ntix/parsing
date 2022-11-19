import { isFloat, isNullOrUndefined, isNumberType } from '../../predicates';
import { Nullable } from '../Nullable';

/**
 * try and parse the value as a float
 *
 * @param value value to parse
 * @returns number, undefined or null
 */
export function tryParseFloat(
  value: unknown
): Nullable<number> {
  if (isNullOrUndefined(value)) return value;
  if (!isFloat(value)) return null;
  if (isNumberType(value)) return value;

  return Number.parseFloat(value);
}
