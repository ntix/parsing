import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { IFloat } from './IFloat';
import { parseFloat } from './parseFloat';
import { NumberParsableTypes } from './NumberParsableTypes';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { ensureNumberArray } from './ensureNumberArray';
import { asCurrent } from '../asCurrent';

/**
 * Fluent builder for parsing floats
 */
export class FloatParser implements IFloat.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<number>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'FLOAT');

  get not() {
    return new FloatParser(this.parent, this.parseCurrent, !this.negate);
  }

  readonly equals = (value: NumberParsableTypes) => new FloatParser(this, asCurrent(provideEquals(parseFloat(value)), this.negate));
  readonly anyOf = (values: NumberParsableTypes[]) => new FloatParser(this, asCurrent(provideAnyOf(ensureNumberArray(values)), this.negate));
  readonly min = (value: NumberParsableTypes, exclusive = false) => new FloatParser(this, asCurrent(provideMin(parseFloat(value), exclusive), this.negate));
  readonly max = (value: NumberParsableTypes, exclusive = false) => new FloatParser(this, asCurrent(provideMax(parseFloat(value), exclusive), this.negate));
}
