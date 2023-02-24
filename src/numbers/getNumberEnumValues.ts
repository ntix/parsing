import { isNumberType } from '../predicates/isNumberType';
import { NumberEnumMap } from './NumberEnumMap';

/**
 * get a number values array from the map
 *
 * @param value an enum
 * @returns number values
 */
export function getNumberEnumValues(value: NumberEnumMap) {
  return Object.values(value).filter(v => isNumberType(v));
}
