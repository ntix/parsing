import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { parseAll } from '../parseAll';
import { parseChain } from '../parseChain';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { provideRangeLength } from '../provideRangeLength';
import { IArray } from './IArray';
import { provideParseArray } from './provideParseArray';

export class ArrayParser<T> implements IArray.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<T[]> = provideParseArray<T>(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain<T[]>(this.parent, this.parseCurrent);

  readonly minLength = (minValue: number, exclusive = false) => new ArrayParser<T>(this, provideMinLength<T[]>(minValue, exclusive, this.negate));
  readonly maxLength = (maxValue: number, exclusive = false) => new ArrayParser<T>(this, provideMaxLength<T[]>(maxValue, exclusive, this.negate));
  readonly rangeLength = (minValue: number, maxValue: number, exclusive = false) => new ArrayParser<T>(this, provideRangeLength<T[]>(minValue, maxValue, exclusive, this.negate));

  readonly each = <T>(parser: IParser<T>) => ({ parse: parseChain<T[]>(this, parseAll(parser.parse)) });

  get not() {
    return new ArrayParser<T>(this.parent, this.parseCurrent, true);
  }
}
