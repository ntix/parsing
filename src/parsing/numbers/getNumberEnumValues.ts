import { isInt } from '../../predicates/isInt';
import { NumberEnumMap } from './NumberEnumMap';

/** get a number values array from the map */
export function getNumberEnumValues(value: NumberEnumMap) {
  return Object.values(value).filter(v => isInt(v));
}
