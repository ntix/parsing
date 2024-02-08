import { IParser } from '../IParser';
import { provideParseDictionaryValues } from './provideParseDictionaryValues';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { Dictionary } from './Dictionary';
import { IDictionary } from './IDictionary';
import { provideParseDictionary } from './provideParseDictionary';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { provideDictionaryValues } from './provideDictionaryValues';
import { asCurrent } from '../asCurrent';

export class DictionaryParser<T> implements IDictionary.Parser<T> {

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<Dictionary<T>>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain<Dictionary<T>>(this.parent, this.parseCurrent, 'DICTIONARY');

  get not() {
    return new DictionaryParser<T>(this.parent, this.parseCurrent, !this.negate);
  }

  readonly of = <U>() => new DictionaryParser<U>(this.parent, asCurrent(provideParseDictionary<U>(), this.negate));
  readonly each = <U = T>(parser: IParser<U>) => new DictionaryParser<U>(this, asCurrent(provideParseDictionaryValues(parser.parse), this.negate));

  readonly minLength = (minValue: number, exclusive = false) => new DictionaryParser<T>(this, asCurrent(provideDictionaryValues<T>(provideMinLength(minValue, exclusive)), this.negate));
  readonly maxLength = (maxValue: number, exclusive = false) => new DictionaryParser<T>(this, asCurrent(provideDictionaryValues<T>(provideMaxLength(maxValue, exclusive)), this.negate));
}
