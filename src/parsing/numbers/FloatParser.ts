import { IParser } from '../IParser';
import { EqualsValidator } from '../EqualsValidator';
import { MaxValidator } from '../MaxValidator';
import { MinValidator } from '../MinValidator';
import { parse } from '../parse';
import { parseFloat } from './parseFloat';

/**
 * Fluent builder for parsing floats
 */
export class FloatParser implements IParser<number> {
  constructor(private parent: IParser<any>) {}

  readonly parse = parse(this.parent, (v) => parseFloat(v));
  readonly equals = (value: number) => new EqualsValidator(this, value, true);
  readonly min = (value: number) => new MinValidator(this, value);
  readonly max = (value: number) => new MaxValidator(this, value);
}
