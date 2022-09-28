import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { validateDateEquals } from './validateDateEquals';

/**
 * Fluent builder for validating as date equal
 */
export class DateEqualsValidator implements IParser<Date> {
  constructor(
    private parent: IParser<Date>,
    private equals: Date,
    private formatter: Intl.DateTimeFormat
  ) {}

  readonly parse = parseChain(this.parent, (v) =>
    validateDateEquals(v, this.equals, this.formatter)
  );
}
