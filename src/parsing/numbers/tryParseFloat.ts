import { isFloat, isNullOrEmpty, isNumberType } from '../../predicates';
import { NumberParsableTypes } from './NumberParsableTypes';

export function tryParseFloat(
  value: NumberParsableTypes
): number | null {
  if (isNullOrEmpty(value) || !isFloat(value)) return null;
  if (isNumberType(value)) return value;

  return Number.parseFloat(value);
}
