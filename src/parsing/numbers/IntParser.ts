import { EqualsValidator } from '../EqualsValidator';
import { IParser } from '../IParser';
import { MaxValidator } from '../MaxValidator';
import { MinValidator } from '../MinValidator';
import { parse } from '../parse';
import { parseInt } from './parseInt';

/**
 * Fluent builder for parsing ints
 */
export class IntParser implements IParser<number> {
  constructor(private parent: IParser<any>, private radix: number) {}

  readonly parse = parse(this.parent, (v) => parseInt(v, this.radix));
  readonly equals = (value: number) => new EqualsValidator(this, value, true);
  readonly min = (value: number) => new MinValidator(this, value);
  readonly max = (value: number) => new MaxValidator(this, value);
}
