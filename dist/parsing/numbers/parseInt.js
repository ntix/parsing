import { tryParseInt } from './tryParseInt';
/**
 * Parse the value passed
 *
 * @param value a parsable number type
 * @param radix base (2-36) defaults to 10 for decimal
 * @returns number or throws if not
 */
export function parseInt(value, radix) {
    const result = tryParseInt(value, radix);
    if (result === null)
        throw new Error(`could not parse "${value}" as a number`);
    return result;
}
