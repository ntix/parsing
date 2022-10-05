import { isFloat, isNullOrEmpty, isNumberType } from '../../predicates';
export function tryParseFloat(value) {
    if (isNullOrEmpty(value) || !isFloat(value))
        return null;
    if (isNumberType(value))
        return value;
    return Number.parseFloat(value);
}
