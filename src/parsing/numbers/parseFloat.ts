import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseFloat } from './tryParseFloat';

export function parseFloat(value: NumberParsableTypes): number {
  const result = tryParseFloat(value);

  if (result === null)
    throw new Error(`could not parse "${value}" as a number`);

  return result;
}
