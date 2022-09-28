import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';
import { validateMin } from './validateMin';

/**
 * Validate a value is a minimum after a maximum validator
 */
export class MaxMinValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(private parent: IParser<T>, private min: T) {}

  readonly parse = parseChain(this.parent, (v) => validateMin(v, this.min));
}
