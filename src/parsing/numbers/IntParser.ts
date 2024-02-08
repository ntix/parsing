import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { NumberParsableTypes } from './NumberParsableTypes';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { ensureNumberArray } from './ensureNumberArray';
import { IInt } from './IInt';
import { parseInt } from './parseInt';
import { NumberEnumMap } from './NumberEnumMap';
import { provideParseInt } from './provideParseInt';
import { asCurrent } from '../asCurrent';

/**
 * Fluent builder for parsing ints
 */
export class IntParser implements IInt.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<number>,
    private radix: number = undefined,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'INT');

  get not() {
    return new IntParser(this.parent, this.parseCurrent, this.radix, !this.negate);
  }

  readonly withRadix = (value?: number) => new IntParser(this.parent, asCurrent(provideParseInt(value), this.negate), this.radix, this.negate);

  readonly equals = (value: NumberParsableTypes) => new IntParser(this, asCurrent(provideEquals(parseInt(value, this.radix)), this.negate), this.radix);
  readonly anyOf = (values: NumberParsableTypes[] | NumberEnumMap) => new IntParser(this, asCurrent(provideAnyOf(ensureNumberArray(values)), this.negate), this.radix);
  readonly min = (value: NumberParsableTypes, exclusive = false) => new IntParser(this, asCurrent(provideMin(parseInt(value, this.radix), exclusive), this.negate), this.radix);
  readonly max = (value: NumberParsableTypes, exclusive = false) => new IntParser(this, asCurrent(provideMax(parseInt(value, this.radix), exclusive), this.negate), this.radix);
}
