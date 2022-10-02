import { SchemaParser } from './parsing';

/** Starting point for a new parsing and validating schema */
export module Is {
  export const boolean = new SchemaParser().boolean;
  export const int = new SchemaParser().int;
  export const float = new SchemaParser().float;
  export const date = new SchemaParser().date;
  export const string = new SchemaParser().string;
  export const object = new SchemaParser().object;
  export const required = new SchemaParser(true);
}
