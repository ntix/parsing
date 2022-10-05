import { isDate, isDateType, isNullOrEmpty } from '../../predicates';
/**
 * Attempt to parse a value to a date
 *
 * TODO: improve, add support for user inputted strings US/UK etc
 * @param value to be parsed
 * @returns a date or null
 */
export function tryParseDate(value) {
    if (isNullOrEmpty(value))
        return null;
    if (isDateType(value))
        return value;
    if (!isDate(value))
        return null;
    return new Date(value);
}
