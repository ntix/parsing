import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { NumberParsableTypes } from './NumberParsableTypes';
import { IParse } from '../IParse';
import { provideOneOf } from '../provideOneOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { IInt } from './IInt';
import { provideParseInt } from './provideParseInt';
import { tryParseInt } from './tryParseInt';
import { Nullable } from '../Nullable';
import { NumberEnumMap } from '../../numbers';

/**
 * Fluent builder for parsing ints
 */
export class IntParser implements IInt.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<number> = provideParseInt(),
    private radix: number = undefined,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent);

  readonly withRadix = (value?: number) => new IntParser(this.parent, this.parseCurrent, value, this.negate);

  readonly equals = (value: Nullable<NumberParsableTypes>) => new IntParser(this, provideEquals(tryParseInt(value, this.radix), this.negate));
  readonly oneOf = (values: Nullable<NumberParsableTypes[] | NumberEnumMap>) => new IntParser(this, provideOneOf(values, this.negate));
  readonly min = (value: Nullable<NumberParsableTypes>, exclusive = false) => new IntParser(this, provideMin(tryParseInt(value, this.radix), exclusive, this.negate));
  readonly max = (value: Nullable<NumberParsableTypes>, exclusive = false) => new IntParser(this, provideMax(tryParseInt(value, this.radix), exclusive, this.negate));

  get not() {
    return new IntParser(this.parent, this.parseCurrent, this.radix, true);
  }
}
