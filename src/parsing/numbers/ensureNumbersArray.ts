import { NumberArrayOrEnumMap } from './NumberArrayOrEnumMap';
import { getNumberEnumValues } from './getNumberEnumValues';

/** get values array if not already */
export function ensureNumbersArray(valuesOrEnum: NumberArrayOrEnumMap) {
  return Array.isArray(valuesOrEnum)
    ? valuesOrEnum
    : getNumberEnumValues(valuesOrEnum);
}
