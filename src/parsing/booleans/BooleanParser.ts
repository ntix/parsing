import { ICurrentParser } from '../ICurrentParser';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { provideEquals } from '../provideEquals';
import { asCurrent } from '../asCurrent';
import { IBoolean } from './IBoolean';

/**
 * Fluent builder for parsing booleans
 */
export class BooleanParser implements IBoolean.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<boolean>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'BOOLEAN');

  get not() {
    return new BooleanParser(this.parent, this.parseCurrent, !this.negate);
  }

  readonly equals = (equalToValue: boolean) => new BooleanParser(this, asCurrent(provideEquals(equalToValue), this.negate));
}
