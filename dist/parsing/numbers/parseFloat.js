import { tryParseFloat } from './tryParseFloat';
export function parseFloat(value) {
    const result = tryParseFloat(value);
    if (result === null)
        throw new Error(`could not parse "${value}" as a number`);
    return result;
}
