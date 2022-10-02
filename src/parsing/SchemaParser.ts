import { IBooleanParser, BooleanParser } from './booleans';
import { createParseResult } from './createParseResult';
import { IDateParser, DateParser } from './dates';
import { ISchemaParser } from './ISchemaParser';
import { IIntParser, IntParser, IFloatParser, FloatParser } from './numbers';
import { ObjectSchema, IObjectParser, ObjectParser } from './objects';
import { parseChain } from './parseChain';
import { IStringParser, StringParser } from './strings';
import { validateRequired } from './validateRequired';

export class SchemaParser implements ISchemaParser {
  constructor(private isRequried = false) {}

  readonly parse = parseChain(null, (value) => (this.isRequried ? validateRequired(value) : createParseResult(value)));
  readonly boolean: IBooleanParser = new BooleanParser(this);
  readonly int: IIntParser = new IntParser(this);
  readonly float: IFloatParser = new FloatParser(this);
  readonly date: IDateParser = new DateParser(this);
  readonly string: IStringParser = new StringParser(this);
  readonly object = <T>(schema: ObjectSchema<T>): IObjectParser<T> => new ObjectParser(this, schema);
}
