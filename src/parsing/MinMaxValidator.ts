import { IParser } from './IParser';
import { parse } from './parse';
import { validateMax } from './validateMax';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

export class MinMaxValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(private parent: IParser<T>, private max: T) {}

  readonly parse = parse(this.parent, (v) => validateMax(v, this.max));
}
