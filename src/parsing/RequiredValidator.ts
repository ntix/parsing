import { IBooleanParser, BooleanParser } from './booleans';
import { createParseResult } from './createParseResult';
import { IDateParser, DateParser } from './dates';
import { IParser } from './IParser';
import { IIntParser, IntParser, FloatParser, IFloatParser } from './numbers';
import { IObjectParser, ObjectParser, ObjectSchema } from './objects';
import { parseChain } from './parseChain';
import { StringParser } from './strings';
import { IStringParser } from './strings/IStringParser';
import { validateRequired } from './validateRequired';

export class RequiredValidator implements IParser<any> {
  constructor(private isRequried) {}

  readonly parse = parseChain(null, (value) => (this.isRequried ? validateRequired(value) : createParseResult(value)));
  readonly boolean: IBooleanParser = new BooleanParser(this);
  readonly int: IIntParser = new IntParser(this);
  readonly float: IFloatParser = new FloatParser(this);
  readonly date: IDateParser = new DateParser(this);
  readonly string: IStringParser = new StringParser(this);
  readonly object = <T>(schema: ObjectSchema<T>): IObjectParser<T> => new ObjectParser(this, schema);
}
