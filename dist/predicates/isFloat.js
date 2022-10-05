import { isNumberType } from './isNumberType';
import { isStringType } from './isStringType';
/** checks values is a integer or a string which can be parsed into a integer */
export function isFloat(value) {
    if (isStringType(value))
        value = Number.parseFloat(value);
    return isNumberType(value) && !isNaN(value);
}
