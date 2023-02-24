import { provideEquals } from '../provideEquals';
import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { provideParseBoolean } from './provideParseBoolean';
import { IBoolean } from './IBoolean';

/**
 * Fluent builder for parsing booleans
 */
export class BooleanParser implements IBoolean.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<boolean> = provideParseBoolean(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent);

  readonly equals = (equalToValue: boolean) => new BooleanParser(this, provideEquals(equalToValue, this.negate));

  get not() {
    return new BooleanParser(this.parent, this.parseCurrent, true);
  }
}
