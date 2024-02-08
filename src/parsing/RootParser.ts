import { ArrayParser, IArray, provideParseArray } from './arrays';
import { DictionaryParser, IDictionary, provideParseDictionary } from './dictionaries';
import { BooleanParser, IBoolean, provideParseBoolean } from './booleans';
import { DateParser, IDate, provideParseDate } from './dates';
import { IRoot } from './IRoot';
import { FloatParser, IFloat, IInt, IntParser, provideParseFloat, provideParseInt } from './numbers';
import { ComplexParser, ComplexSchema, IComplex, provideParseComplex } from './complex';
import { parseChain } from './parseChain';
import { IString, StringParser, provideParseString } from './strings';
import { IJson, JsonParser, provideParseJson } from './json';
import { provideParseRoot } from './provideParseRoot';
import { NextBuilder } from './NextBuilder';
import { ICurrentParser } from './ICurrentParser';
import { asCurrent } from './asCurrent';
import { IParser } from './IParser';

export class RootParser implements IRoot.Parser {

  constructor(
    private parseCurrent: ICurrentParser<unknown>,
    private readonly negate = false
  ) { }

  readonly parse = parseChain(null, this.parseCurrent, 'ROOT');

  get not() {
    return new RootParser(this.parseCurrent, !this.negate);
  }

  get required() {
    return new RootParser(asCurrent(provideParseRoot(true), this.negate));
  }

  readonly boolean: IBoolean.Parser = new BooleanParser(this, asCurrent(provideParseBoolean(), this.negate));
  readonly int: IInt.Parser = new IntParser(this, asCurrent(provideParseInt(), this.negate));
  readonly float: IFloat.Parser = new FloatParser(this, asCurrent(provideParseFloat(), this.negate));
  readonly date: IDate.Parser = new DateParser(this, asCurrent(provideParseDate(), this.negate));
  readonly string: IString.Parser = new StringParser(this, asCurrent(provideParseString(), this.negate));
  readonly json: IJson.Parser = new JsonParser(this, asCurrent(provideParseJson(), this.negate));
  readonly array: NextBuilder<IArray.Parser> = new ArrayParser(this, asCurrent(provideParseArray(), this.negate));
  readonly dictionary: IDictionary.Parser = new DictionaryParser(this, asCurrent(provideParseDictionary(), this.negate));

  readonly for = <T>(schema: ComplexSchema<T>): IComplex.Parser<T> => new ComplexParser(this, asCurrent(provideParseComplex<T>(schema), this.negate));
  readonly use = <T>(parser: IParser<T>) => ({ parse: parseChain<T>(this, { ... this.parseCurrent, parse: parser.parse }, 'ROOT-USE') });
}
