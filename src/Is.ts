import { IRoot, RootParser } from './parsing';

/** Starting point for a new parsing and validating */
export class Is {
  private constructor() {
    throw new Error('static class');
  }

  /** value is not undefined, allows null or empty string */
  static readonly defined: IRoot.Parser = new RootParser(true, false);
  /** value is not undefined or null */
  static readonly required: IRoot.Parser = new RootParser(false, true);

  /** parse a boolean */
  static readonly boolean = new RootParser().boolean;
  /** parse a number (int) */
  static readonly int = new RootParser().int;
  /** parse a number (float) */
  static readonly float = new RootParser().float;
  /** parse a date */
  static readonly date = new RootParser().date;
  /** parse a string */
  static readonly string = new RootParser().string;
  /** parse an array */
  static readonly array = new RootParser().array;

  /** parse a complex object */
  static readonly object = new RootParser().object;
  /** parse with a function */
  static readonly use = new RootParser().use;
}
