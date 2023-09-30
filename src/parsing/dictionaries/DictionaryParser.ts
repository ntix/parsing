import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { parseAllDictionary } from './parseAllDictionary';
import { parseChain } from '../parseChain';
import { Dictionary } from './Dictionary';
import { IDictionary } from './IDictionary';
import { provideParseDictionary } from './provideParseDictionary';

export class DictionaryParser<T> implements IDictionary.Parser<T> {

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<Dictionary<T>> = provideParseDictionary<T>(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain<Dictionary<T>>(this.parent, this.parseCurrent);

  get not() {
    return new DictionaryParser<T>(this.parent, this.parseCurrent, true);
  }

  readonly of = <U>() => new DictionaryParser<U>(this.parent);
  readonly each = <U = T>(parser: IParser<U>) => new DictionaryParser<U>(this, parseAllDictionary(parser.parse), this.negate);
}
