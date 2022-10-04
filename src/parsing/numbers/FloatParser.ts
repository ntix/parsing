import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { IFloat } from './IFloat';
import { NumberParsableTypes } from './NumberParsableTypes';
import { IParse } from '../IParse';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { provideRange } from '../provideRange';
import { ensureNumberArray } from './ensureNumberArray';
import { parseFloat } from './parseFloat';
import { provideParseFloat } from './provideParseFloat';

/**
 * Fluent builder for parsing floats
 */
export class FloatParser implements IFloat.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<number> = provideParseFloat(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent);
  readonly equals = (value: NumberParsableTypes) => new FloatParser(this, provideEquals(parseFloat(value), this.negate));
  readonly anyOf = (values: NumberParsableTypes[]) => new FloatParser(this, provideAnyOf(ensureNumberArray(values), this.negate));
  readonly min = (value: NumberParsableTypes, exclusive = false) => new FloatParser(this, provideMin(parseFloat(value), exclusive, this.negate));
  readonly max = (value: NumberParsableTypes, exclusive = false) => new FloatParser(this, provideMax(parseFloat(value), exclusive, this.negate));
  readonly range = (min: NumberParsableTypes, max: NumberParsableTypes, exclusive = false) => new FloatParser(this, provideRange(parseFloat(min), parseFloat(max), exclusive, this.negate));

  get not() {
    return new FloatParser(this.parent, this.parseCurrent, true);
  }
}
