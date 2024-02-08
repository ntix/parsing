import { NumberEnumMap } from './numbers/NumberEnumMap';
import { getNumberEnumValues } from './numbers/getNumberEnumValues';

/**
 * Creates error objects
 */
export class ParseErrors {
  /** not an error */
  static readonly empty = {};
  /** required */
  static readonly required = { required: true };
  /** wrap error in a not */
  static readonly not = <T>(value: T) => ({ not: value });
  /** value should be a boolean */
  static readonly boolean = { boolean: true };
  /** value should be an int */
  static readonly int = { int: true };
  /** value should be a float */
  static readonly float = { float: true };
  /** value should be a date */
  static readonly date = { date: true };
  /** value should be a string */
  static readonly string = { string: true };
  /** value should be equal to the value, ignoreCase only valid for string */
  static readonly equals = <T>(value: T, ignoreCase?: boolean) => ({ equals: { value, ...(ignoreCase !== undefined && { ignoreCase }) } });
  /** value should be equal to any of the values, ignoreCase only valid for string */
  static readonly anyOf = <T>(values: T[] | NumberEnumMap, ignoreCase?: boolean) => ({ anyOf: { value: Array.isArray(values) ? values : getNumberEnumValues(values), ...(ignoreCase !== undefined && { ignoreCase }) } });
  /** value should be at least */
  static readonly min = <T>(value: T, exclusive: boolean = false) => ({ min: { value, exclusive } });
  /** value should be at most */
  static readonly max = <T>(value: T, exclusive: boolean = false) => ({ max: { value, exclusive } });
  /** value length should be at least */
  static readonly minLength = <T>(value: T, exclusive: boolean = false) => ({ minLength: value, exclusive });
  /** value length should be at most */
  static readonly maxLength = <T>(value: T, exclusive: boolean = false) => ({ maxLength: value, exclusive });
  /** value should be an array */
  static readonly array = { array: true };
  /** value should be a array */
  static readonly dictionary = { dictionary: true };
  /** value should be a complex object */
  static readonly complex = { object: true };
  /** value should be a json */
  static readonly json = { json: true };
  /** value includes */
  static readonly matches = <T>(name: T) => ({ matches: name });
  /** value includes */
  static readonly includes = <T>(value: T, ignoreCase?: boolean) => ({ includes: { value, ...(ignoreCase !== undefined && { ignoreCase }) } });
  /** starts with */
  static readonly startsWith = <T>(value: T, ignoreCase?: boolean) => ({ startsWith: { value, ...(ignoreCase !== undefined && { ignoreCase }) } });
  /** ends with */
  static readonly endsWith = <T>(value: T, ignoreCase?: boolean) => ({ endsWith: { value, ...(ignoreCase !== undefined && { ignoreCase }) } });
  /** values unique */
  static readonly unique = { unique: true };
}
