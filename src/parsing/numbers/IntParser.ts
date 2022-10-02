import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { NumberParsableTypes } from './NumberParsableTypes';
import { IParse } from '../IParse';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { provideRange } from '../provideRange';
import { ensureNumberArray } from './ensureNumberArray';
import { IInt } from './IInt';
import { provideParseInt } from './provideParseInt';
import { parseInt } from './parseInt';
import { NumberEnumMap } from './NumberEnumMap';

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
  readonly equals = (value: NumberParsableTypes) => new IntParser(this, provideEquals(parseInt(value, this.radix), this.negate));
  readonly anyOf = (values: NumberParsableTypes[] | NumberEnumMap) => new IntParser(this, provideAnyOf(ensureNumberArray(values), this.negate));
  readonly min = (value: NumberParsableTypes, exclusive = false) => new IntParser(this, provideMin(parseInt(value, this.radix), exclusive, this.negate));
  readonly max = (value: NumberParsableTypes, exclusive = false) => new IntParser(this, provideMax(parseInt(value, this.radix), exclusive, this.negate));
  readonly range = (min: NumberParsableTypes, max: NumberParsableTypes, exclusive = false) => new IntParser(this, provideRange(parseInt(min, this.radix), parseInt(max, this.radix), exclusive, this.negate));

  get not() {
    return new IntParser(this.parent, this.parseCurrent, this.radix, true);
  }
}
