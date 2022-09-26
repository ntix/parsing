import { IParser } from '../IParser';
import { parse } from '../parse';
import { validateMin } from './validateMin';
import { NumberMinMaxValidator } from './NumberMinMaxValidator';

export class NumberMinValidator implements IParser<number> {
  constructor(private parent: IParser<number>, private min: number) {}

  readonly parse = parse(this.parent, (v) => validateMin(v, this.min));
  readonly max = (value: number) => new NumberMinMaxValidator(this, value);
}
