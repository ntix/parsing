import { IParser } from '../IParser';
import { parse } from '../parse';
import { parseFloat } from './parseFloat';
import { NumberEqualsValidator } from './NumberEqualsValidator';
import { NumberMaxValidator } from './NumberMaxValidator';
import { NumberMinValidator } from './NumberMinValidator';

export class FloatParser implements IParser<number> {
  constructor(private parent: IParser<any>) {}

  readonly parse = parse(this.parent, (v) => parseFloat(v));
  readonly equals = (value: number) => new NumberEqualsValidator(this, value);
  readonly min = (value: number) => new NumberMinValidator(this, value);
  readonly max = (value: number) => new NumberMaxValidator(this, value);
}
