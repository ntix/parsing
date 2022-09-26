import { isString } from './isString';

/** checks values is an integer or a string which can be parsed into a integer */
export function isInt(a: any): boolean {
  if (isString(a)) a = Number.parseFloat(a);
  return !isNaN(a) && typeof a === 'number' && Number.isInteger(a);
}
