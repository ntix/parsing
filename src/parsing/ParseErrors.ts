import { NumberEnumMap, getNumberEnumValues } from '../numbers';
import { IParseErrors } from './IParseErrors';

/**
 * Creates error objects
 */
export class ParseErrors {
  /** not an error */
  static readonly empty: IParseErrors = {};
  /** not undefined, allows null or empty string*/
  static readonly defined: IParseErrors = { defined: true };
  /** not undefined, null or empty string */
  static readonly required: IParseErrors = { required: true };
  /** wrap error in a not */
  static readonly not: <T>(value: T) => IParseErrors = value => ({ not: value });
  /** value should be a boolean */
  static readonly boolean: IParseErrors = { boolean: true };
  /** value should be an int */
  static readonly int: IParseErrors = { int: true };
  /** value should be a float */
  static readonly float: IParseErrors = { float: true };
  /** value should be a date */
  static readonly date: IParseErrors = { date: true };
  /** value should be equal to the value */
  static readonly equals: <T>(value: T) => IParseErrors = value => ({ equals: value });
  /** value should be equal to one of the values */
  static readonly oneOf: <T>(value: T[] | NumberEnumMap) => IParseErrors = values => ({ oneOf: Array.isArray(values) ? values : getNumberEnumValues(values) });
  /** value should be at least */
  static readonly min: <T>(value: T, exclusive?: boolean) => IParseErrors = (value, exclusive = false) => ({ min: { value, exclusive } });
  /** value should be at most */
  static readonly max: <T>(value: T, exclusive?: boolean) => IParseErrors = (value, exclusive = false) => ({ max: { value, exclusive } });
  /** value length should be at least */
  static readonly minLength: <T>(value: T) => IParseErrors = value => ({ minLength: value });
  /** value length should be at most */
  static readonly maxLength: <T>(value: T) => IParseErrors = value => ({ maxLength: value });
  /** value should be an array */
  static readonly array: IParseErrors = { array: true };
  /** value matches */
  static readonly matches: (name: string | RegExp) => IParseErrors = name => ({ matches: name });
  /** value includes */
  static readonly includes: <T>(value: T, ignoreCase?: boolean) => IParseErrors = (value, ignoreCase = false) => ({ includes: { value, ignoreCase } });
  /** starts with */
  static readonly startsWith: <T>(value: T, ignoreCase?: boolean) => IParseErrors = (value, ignoreCase = false) => ({ startsWith: { value, ignoreCase } });
  /** ends with */
  static readonly endsWith: <T>(value: T, ignoreCase?: boolean) => IParseErrors = (value, ignoreCase = false) => ({ endsWith: { value, ignoreCase } });
  /** values unique */
  static readonly unique: IParseErrors = { unique: true };
}
