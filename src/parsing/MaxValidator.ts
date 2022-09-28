import { IParser } from './IParser';
import { MinMaxValidator } from './MinMaxValidator';
import { parseChain } from './parseChain';
import { validateMax } from './validateMax';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export class MaxValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(private parent: IParser<T>, private max: T) {}

  readonly parse = parseChain(this.parent, (v) => validateMax(v, this.max));
  readonly min = (value: T) => new MinMaxValidator(this, value);
}
