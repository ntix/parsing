import { NumberParsableTypes } from '../parsing/numbers/NumberParsableTypes';
import { getNumberEnumValues } from './getNumberEnumValues';
import { NumberEnumMap } from './NumberEnumMap';

/**
 * Returns an array of values from an enum if required
 *
 * @param valuesOrEnum array of values or an enum
 * @returns array of values
 */
export function ensureNumberArray(valuesOrEnum: NumberParsableTypes[] | NumberEnumMap) {
  return Array.isArray(valuesOrEnum)
    ? valuesOrEnum
    : getNumberEnumValues(valuesOrEnum);
}
