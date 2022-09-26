import { IParser } from '../IParser';
import { parse } from '../parse';
import { validateMax } from './validateMax';

export class NumberMinMaxValidator implements IParser<number> {
  constructor(private parent: IParser<number>, private max: number) {}

  readonly parse = parse(this.parent, (v) => validateMax(v, this.max));
}
