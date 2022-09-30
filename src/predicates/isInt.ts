import { isStringType } from './isStringType';

/** checks values is an integer or a string which can be parsed into a integer */
export function isInt(value: any): boolean {
  if (isStringType(value)) value = Number.parseFloat(value);
  return !isNaN(value) && typeof value === 'number' && Number.isInteger(value);
}
