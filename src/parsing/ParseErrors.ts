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
  /** value should be equal to the value */
  static readonly equals = <T>(value: T) => ({ equals: value });
  /** value should be equal to any of the values */
  static readonly anyOf = <T>(values: T[]) => ({ anyOf: values });
  /** value should be at least */
  static readonly min = <T>(value: T) => ({ min: value });
  /** value should be at most */
  static readonly max = <T>(value: T) => ({ max: value });
  /** value length should be at least */
  static readonly minLength = <T>(value: T) => ({ minLength: value });
  /** value length should be at most */
  static readonly maxLength = <T>(value: T) => ({ maxLength: value });
  /** value should be an array */
  static readonly array = { array: true };
}
