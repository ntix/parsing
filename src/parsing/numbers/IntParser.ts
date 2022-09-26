import { IParser } from '../IParser';
import { parse } from '../parse';
import { parseInt } from './parseInt';
import { NumberEqualsValidator } from './NumberEqualsValidator';
import { NumberMaxValidator } from './NumberMaxValidator';
import { NumberMinValidator } from './NumberMinValidator';

export class IntParser implements IParser<number> {
  constructor(private parent: IParser<any>, private radix: number) {}

  readonly parse = parse(this.parent, (v) => parseInt(v, this.radix));
  readonly equals = (value: number) => new NumberEqualsValidator(this, value);
  readonly min = (value: number) => new NumberMinValidator(this, value);
  readonly max = (value: number) => new NumberMaxValidator(this, value);
}
