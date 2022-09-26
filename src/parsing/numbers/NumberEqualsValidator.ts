import { IParser } from '../IParser';
import { parse } from '../parse';
import { validateEquals } from './validateEquals';

export class NumberEqualsValidator implements IParser<number> {
  constructor(private parent: IParser<number>, private max: number) {}

  readonly parse = parse(this.parent, (v) => validateEquals(v, this.max));
}
