import { IBooleanParser } from './booleans';
import { IDateParser } from './dates';
import { IParser } from './IParser';
import { IIntParser, IFloatParser } from './numbers';
import { ObjectSchema, IObjectParser } from './objects';
import { IStringParser } from './strings';

/** Root builder */
export interface IRootBuilder {
  readonly boolean: IBooleanParser;
  readonly int: IIntParser;
  readonly float: IFloatParser;
  readonly date: IDateParser;
  readonly string: IStringParser;
  readonly object: <T>(schema: ObjectSchema<T>) => IObjectParser<T>;
  readonly use: <T>(parser: IParser<T>) => IParser<T>;
}
