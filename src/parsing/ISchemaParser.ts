import { IBooleanParser } from './booleans';
import { IDateParser } from './dates';
import { IParse } from './IParse';
import { IParser } from './IParser';
import { IIntParser, IFloatParser } from './numbers';
import { ObjectSchema, IObjectParser } from './objects';
import { IStringParser } from './strings';

export interface ISchemaParser extends IParser<any> {
  readonly parse: IParse<any>;
  readonly boolean: IBooleanParser;
  readonly int: IIntParser;
  readonly float: IFloatParser;
  readonly date: IDateParser;
  readonly string: IStringParser;
  readonly object: <T>(schema: ObjectSchema<T>) => IObjectParser<T>;
}
