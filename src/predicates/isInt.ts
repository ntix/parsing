import { NumberParsableTypes } from '../parsing/numbers/NumberParsableTypes';
import { isNullOrEmpty } from './isNullOrEmpty';
import { isNumberType } from './isNumberType';
import { isStringType } from './isStringType';

/**
 * checks values is an integer or a string which can be parsed into a integer
 *
 * @param value to be parsed
 * @returns true is can be parsed to an integer
 */
export function isInt(value: unknown): value is NumberParsableTypes {
  if (isNullOrEmpty(value)) return false;
  if (isStringType(value)) value = Number.parseFloat(value);
  return isNumberType(value) && !isNaN(value) && Number.isInteger(value);
}
