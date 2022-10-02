import { isNullOrEmpty } from '../predicates';
import { IBooleanParser, BooleanParser } from './booleans';
import { createParseResult } from './createParseResult';
import { IDateParser, DateParser } from './dates';
import { IParser } from './IParser';
import { IRootParser } from './IRootParser';
import { IArrayParser, ArrayParser } from './arrays';
import { IIntParser, IntParser, IFloatParser, FloatParser } from './numbers';
import { ObjectSchema, IObjectParser, ObjectParser } from './objects';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';
import { IStringParser, StringParser } from './strings';

export class RootParser implements IRootParser {
  constructor(private isRequried = false) {}

  readonly parse = parseChain(null, (value) =>
    this.isRequried && isNullOrEmpty(value) ? createParseResult(value, ParseErrors.required) : createParseResult(value)
  );

  readonly boolean: IBooleanParser = new BooleanParser(this);
  readonly int: IIntParser = new IntParser(this);
  readonly float: IFloatParser = new FloatParser(this);
  readonly date: IDateParser = new DateParser(this);
  readonly string: IStringParser = new StringParser(this, false);
  readonly object = <T>(schema: ObjectSchema<T>): IObjectParser<T> => new ObjectParser(this, schema);
  readonly use = <T>(parser: IParser<T>) => ({ parse: parseChain<T>(this, parser.parse) });
  readonly array: IArrayParser = new ArrayParser(this);
}
