import { isInt, isNullOrUndefined, isNumberType } from '../../predicates';
import { Nullable } from '../Nullable';
import { NumberParsableTypes } from './NumberParsableTypes';

/**
 * try and parse the value as an int
 *
 * @param value value to parse
 * @returns number, undefined or null
 */
export function tryParseInt(
  value: Nullable<NumberParsableTypes>, radix: number = undefined
): Nullable<number> {
  if (isNullOrUndefined(value)) return value;
  if (!isInt(value)) return null;
  if (isNumberType(value)) return value;

  return Number.parseInt(value, radix);
}
