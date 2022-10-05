import { isInt, isNullOrEmpty, isNumberType } from '../../predicates';
/** Attempt to parse an integer value */
export function tryParseInt(value, radix = undefined) {
    if (isNullOrEmpty(value) || !isInt(value))
        return null;
    if (isNumberType(value))
        return value;
    return Number.parseInt(value, radix);
}
