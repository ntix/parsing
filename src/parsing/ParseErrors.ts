export class ParseErrors {
  static readonly empty = {};
  static readonly required = { required: true };
  static readonly int = (value: number) => ({ int: value });
  static readonly float = { float: true };
  static readonly equals = <T>(value: T) => ({ equals: value });
  static readonly min = (value: number) => ({ min: value });
  static readonly max = (value: number) => ({ max: value });
}
