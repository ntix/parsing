import { IParser } from './IParser';
import { MinMaxValidator } from './MinMaxValidator';
import { parse } from './parse';
import { validateMin } from './validateMin';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export class MinValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(private parent: IParser<T>, private min: T) {}

  readonly parse = parse(this.parent, (v) => validateMin(v, this.min));
  readonly max = (value: T) => new MinMaxValidator(this, value);
}