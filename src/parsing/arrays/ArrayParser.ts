import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { parseAll } from '../parseAll';
import { parseChain } from '../parseChain';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { IArray } from './IArray';
import { provideParseArray } from './provideParseArray';
import { provideUniqueArray } from './provideUniqueArray';

export class ArrayParser<T> implements IArray.Parser<T> {

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<T[]> = provideParseArray<T>(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain<T[]>(this.parent, this.parseCurrent);

  get not() {
    return new ArrayParser<T>(this.parent, this.parseCurrent, true);
  }

  readonly of = <U>() => new ArrayParser<U>(this.parent);
  readonly each = <U = T>(parser: IParser<U>) => new ArrayParser<U>(this, parseAll(parser.parse), this.negate);

  readonly unique = (distinctor: (item: T) => unknown) => new ArrayParser<T>(this, provideUniqueArray(distinctor, this.negate));
  readonly minLength = (minValue: number, exclusive = false) => new ArrayParser<T>(this, provideMinLength<T[]>(minValue, exclusive, this.negate));
  readonly maxLength = (maxValue: number, exclusive = false) => new ArrayParser<T>(this, provideMaxLength<T[]>(maxValue, exclusive, this.negate));
}
