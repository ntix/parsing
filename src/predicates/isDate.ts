import { DateParsableTypes } from '../parsing';
import { isDateType } from './isDateType';
import { isNullOrEmpty } from './isNullOrEmpty';
import { isNumberType } from './isNumberType';
import { isStringType } from './isStringType';

/** checks value is a date */
export function isDate(value: unknown): value is DateParsableTypes {
  if (isNullOrEmpty(value)) return false;
  if (isDateType(value)) return true;
  if (isStringType(value)) return !isNaN(Date.parse(value));
  if (isNumberType(value)) return !isNaN(value);

  return false;
}
