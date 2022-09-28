import { BooleanParser } from './booleans';
import { DateParser } from './dates';
import { IParser } from './IParser';
import { IntParser, FloatParser } from './numbers';
import { parseChain } from './parseChain';
import { validateRequired } from './validateRequired';

export class RequiredValidator implements IParser<any> {
  constructor(private parent: IParser<any>) {}

  readonly parse = parseChain(this.parent, (v) => validateRequired(v));
  readonly boolean = () => new BooleanParser(this);
  readonly int = (radix?: number) => new IntParser(this, radix);
  readonly float = () => new FloatParser(this);
  readonly date = () => new DateParser(this);
}
