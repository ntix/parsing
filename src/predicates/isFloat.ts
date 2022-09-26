import { isString } from './isString';

/** checks values is a integer or a string which can be parsed into a integer */
export function isFloat(a: any): boolean {
  if (isString(a)) a = Number.parseFloat(a);
  return !isNaN(a) && typeof a === 'number';
}
