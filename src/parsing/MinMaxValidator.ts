import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { validateMax } from './validateMax';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export class MinMaxValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(private parent: IParser<T>, private max: T) {}

  readonly parse = parseChain(this.parent, (v) => validateMax(v, this.max));
}
