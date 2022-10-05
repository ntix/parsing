import { getNumberEnumValues } from './getNumberEnumValues';
/** get values array if not already */
export function ensureNumberArray(valuesOrEnum) {
    return Array.isArray(valuesOrEnum)
        ? valuesOrEnum
        : getNumberEnumValues(valuesOrEnum);
}
