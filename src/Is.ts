import { IRootParser, RootParser } from './parsing';

/** Starting point for a new parsing and validating */
export module Is {
  export const required: IRootParser = new RootParser(true);
  export const boolean = new RootParser().boolean;
  export const int = new RootParser().int;
  export const float = new RootParser().float;
  export const date = new RootParser().date;
  export const string = new RootParser().string;
  export const object = new RootParser().object;
  export const array = new RootParser().array;
  export const use = new RootParser().use;
}
