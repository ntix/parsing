import { isNumberType } from './isNumberType';
import { isStringType } from './isStringType';

/** checks values is an integer or a string which can be parsed into a integer */
export function isInt(value: unknown): boolean {
  if (isStringType(value)) value = Number.parseFloat(value);
  return isNumberType(value) && !isNaN(value) && Number.isInteger(value);
}
