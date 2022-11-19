import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseFloat } from './tryParseFloat';

/**
 * Parse the value passed
 *
 * @param value a parsable number type
 * @returns number (float) or throws if not
 */
export function parseFloat(value: NumberParsableTypes): number {
  const result = tryParseFloat(value);

  if (result === null)
    throw new Error(`could not parse "${value}" as a number`);

  return result;
}
