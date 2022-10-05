import { isInt } from '../../predicates';
/** get a number values array from the map */
export function getNumberEnumValues(value) {
    return Object.values(value).filter(v => isInt(v));
}
