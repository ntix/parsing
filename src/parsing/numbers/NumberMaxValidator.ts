import { IParser } from '../IParser';
import { parse } from '../parse';
import { validateMax } from './validateMax';
import { NumberMinMaxValidator } from './NumberMinMaxValidator';

export class NumberMaxValidator implements IParser<number> {
  constructor(private parent: IParser<number>, private max: number) {}

  readonly parse = parse(this.parent, (v) => validateMax(v, this.max));
  readonly min = (value: number) => new NumberMinMaxValidator(this, value);
}
