import { DateParser } from './dates';
import { IParser } from './IParser';
import { IntParser, FloatParser } from './numbers';
import { parse } from './parse';
import { validateRequired } from './validateRequired';

export class RequiredValidator implements IParser<any> {
  constructor(private parent: IParser<any>) {}

  readonly parse = parse(this.parent, (v) => validateRequired(v));
  readonly int = (radix?: number) => new IntParser(this, radix);
  readonly float = () => new FloatParser(this);
  readonly date = () => new DateParser(this);
}
