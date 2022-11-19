import { NumberEnumMap, getNumberEnumValues } from '../numbers';
import { isEqual } from './isEqual';

export function isOneOf<T>(value: T, values: T[] | NumberEnumMap) {

  const valueArray = Array.isArray(values)
    ? values
    : getNumberEnumValues(values);

  return valueArray.some(v => isEqual(v, value));
}
