import { IParser } from './IParser';
import { parse } from './parse';
import { validateEquals } from './validateEquals';
import { RelationalValidatorTypes } from './RelationalValidatorTypes';

/**
 * Fluent builder for validating as equal
 */
export class EqualsValidator<T extends RelationalValidatorTypes>
  implements IParser<T>
{
  constructor(
    private parent: IParser<T>,
    private equals: T,
    private strictly: boolean
  ) {}

  readonly parse = parse(this.parent, (v) =>
    validateEquals(v, this.equals, this.strictly)
  );
}