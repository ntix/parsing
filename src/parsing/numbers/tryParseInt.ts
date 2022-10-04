import { isInt, isNullOrEmpty, isNumberType } from '../../predicates';
import { NumberParsableTypes } from './NumberParsableTypes';

/** Attempt to parse an integer value */
export function tryParseInt(
  value: NumberParsableTypes, radix: number = undefined
): number | null {
  if (isNullOrEmpty(value) || !isInt(value)) return null;
  if (isNumberType(value)) return value;

  return Number.parseInt(value, radix);
}
