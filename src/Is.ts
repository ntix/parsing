import { RootParser, provideParseRoot } from './parsing';
import { asCurrent } from './parsing/asCurrent';

/** Starting point for a new parsing and validating */
export class Is {
  private constructor() {
    throw new Error('static class');
  }

  private static root = new RootParser(asCurrent(provideParseRoot(false)));

  static readonly not = Is.root.not;
  static readonly required = Is.root.required;

  static readonly boolean = Is.root.boolean;
  static readonly int = Is.root.int;
  static readonly float = Is.root.float;
  static readonly date = Is.root.date;
  static readonly string = Is.root.string;
  static readonly array = Is.root.array;
  static readonly dictionary = Is.root.dictionary;
  static readonly json = Is.root.json;

  static readonly for = Is.root.for;
  static readonly use = Is.root.use;
}
