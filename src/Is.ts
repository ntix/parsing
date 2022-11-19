import { IRoot, RootParser } from './parsing';

/** Starting point for a new parsing and validating */
export class Is {
  private constructor() {
    throw new Error('static class');
  }

  /** value is required */
  static readonly required: IRoot.Parser = new RootParser(true);

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

  /** conditional if */
  static readonly if = new RootParser().if;
  /** parse a complex object */
  static readonly for = new RootParser().for;
  /** parse with a function */
  static readonly use = new RootParser().use;
}
