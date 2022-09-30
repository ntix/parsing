import { IParser } from './IParser';
import { parseChain } from './parseChain';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';
import { isEqual, isNullOrEmpty } from '../predicates';
import { ParseErrors } from './ParseErrors';

/**
 * Fluent builder for validating as equal
 */
export class EqualsValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(private parent: IParser<T>, private equalToValue: T) {}

  readonly parse = parseChain(this.parent, (value) => {
    if (isNullOrEmpty(value) || isEqual(value, this.equalToValue))
      return { value, success: true, errors: ParseErrors.empty };

    return {
      value,
      success: false,
      errors: ParseErrors.equals(this.equalToValue),
    };
  });
}
