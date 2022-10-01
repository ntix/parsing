import { IBooleanParser, BooleanParser } from './booleans';
import { IDateParser, DateParser } from './dates';
import { IParser } from './IParser';
import { IIntParser, IntParser, FloatParser, IFloatParser } from './numbers';
import { parseChain } from './parseChain';
import { StringParser } from './strings';
import { IStringParser } from './strings/IStringParser';
import { validateRequired } from './validateRequired';

export class RequiredValidator implements IParser<any> {
  constructor(private parent: IParser<any>) {}

  readonly parse = parseChain(this.parent, (v) => validateRequired(v));
  readonly boolean: IBooleanParser = new BooleanParser(this);
  readonly int: IIntParser = new IntParser(this);
  readonly float: IFloatParser = new FloatParser(this);
  readonly date: IDateParser = new DateParser(this);
  readonly string: IStringParser = new StringParser(this);
}
