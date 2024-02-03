import { IRoot, RootParser } from './parsing';

/** Starting point for a new parsing and validating */
export class Is {
  private constructor() {
    throw new Error('static class');
  }

  static readonly required: IRoot.Parser = new RootParser(true, false);

  static readonly boolean = new RootParser().boolean;
  static readonly int = new RootParser().int;
  static readonly float = new RootParser().float;
  static readonly date = new RootParser().date;
  static readonly string = new RootParser().string;
  static readonly array = new RootParser().array;
  static readonly dictionary = new RootParser().dictionary;
  static readonly json = new RootParser().json;

  static readonly for = new RootParser().for;
  static readonly use = new RootParser().use;

  static readonly not = new RootParser(false, true);
}
