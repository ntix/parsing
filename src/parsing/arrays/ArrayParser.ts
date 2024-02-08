import { IParser } from '../IParser';
import { provideParseArrayValues } from './provideParseArrayValues';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { IArray } from './IArray';
import { provideParseArray } from './provideParseArray';
import { provideParseUniqueArray } from './provideParseUniqueArray';
import { asCurrent } from '../asCurrent';

export class ArrayParser<T> implements IArray.Parser<T> {

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<T[]>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'ARRAY');

  get not() {
    return new ArrayParser<T>(this.parent, this.parseCurrent, !this.negate);
  }

  readonly of = <U>() => new ArrayParser<U>(this.parent, asCurrent(provideParseArray<U>(), this.negate));
  readonly each = <U = T>(parser: IParser<U>) => new ArrayParser<U>(this, asCurrent(provideParseArrayValues(parser.parse), this.negate));

  readonly unique = <U = T>(distinctor: (item: U) => unknown) => new ArrayParser<U>(this, asCurrent(provideParseUniqueArray(distinctor), this.negate));
  readonly minLength = (minValue: number, exclusive = false) => new ArrayParser<T>(this, asCurrent(provideMinLength<T[]>(minValue, exclusive), this.negate));
  readonly maxLength = (maxValue: number, exclusive = false) => new ArrayParser<T>(this, asCurrent(provideMaxLength<T[]>(maxValue, exclusive), this.negate));
}
