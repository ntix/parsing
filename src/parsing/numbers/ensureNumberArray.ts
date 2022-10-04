import { getNumberEnumValues } from './getNumberEnumValues';
import { NumberParsableTypes } from './NumberParsableTypes';
import { NumberEnumMap } from './NumberEnumMap';

/** get values array if not already */
export function ensureNumberArray(valuesOrEnum: NumberParsableTypes[] | NumberEnumMap) {
  return Array.isArray(valuesOrEnum)
    ? valuesOrEnum
    : getNumberEnumValues(valuesOrEnum);
}
