export class ParseErrors {
  static readonly empty = {};
  static readonly required = { required: true };
  static readonly boolean = { boolean: true };
  static readonly int = (value: number) => ({ int: value });
  static readonly float = { float: true };
  static readonly date = { date: true };
  static readonly equals = <T>(value: T) => ({ equals: value });
  static readonly anyOf = <T>(values: T[]) => ({ anyOf: values });
  static readonly min = <T>(value: T) => ({ min: value });
  static readonly max = <T>(value: T) => ({ max: value });
}
