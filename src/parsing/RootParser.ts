import { ArrayParser, IArray, provideParseArray } from './arrays';
import { DictionaryParser, IDictionary, provideParseDictionary } from './dictionaries';
import { BooleanParser, IBoolean, provideParseBoolean } from './booleans';
import { DateParser, IDate, provideParseDate } from './dates';
import { IParser } from './IParser';
import { IRoot } from './IRoot';
import { FloatParser, IFloat, IInt, IntParser, provideParseFloat, provideParseInt } from './numbers';
import { ComplexParser, ComplexSchema, IComplex } from './complex';
import { parseChain } from './parseChain';
import { IString, StringParser, provideParseString } from './strings';
import { IJson, JsonParser, provideParseJson } from './json';
import { provideParseRoot } from './provideParseRoot';

export class RootParser implements IRoot.Parser {
  constructor(
    private isRequried = false,
    private negate = false
  ) { }

  readonly parse = parseChain(null, provideParseRoot(this.isRequried));

  readonly boolean: IBoolean.Parser = new BooleanParser(this, provideParseBoolean(this.negate));
  readonly int: IInt.Parser = new IntParser(this, provideParseInt(this.negate));
  readonly float: IFloat.Parser = new FloatParser(this, provideParseFloat(this.negate));
  readonly date: IDate.Parser = new DateParser(this, provideParseDate(this.negate));
  readonly string: IString.Parser = new StringParser(this, provideParseString(this.negate));
  readonly array: IArray.Parser = new ArrayParser(this, provideParseArray(this.negate));
  readonly dictionary: IDictionary.Parser = new DictionaryParser(this, provideParseDictionary(this.negate));
  readonly json: IJson.Parser = new JsonParser(this, provideParseJson(this.negate));

  readonly for = <T>(schema: ComplexSchema<T>): IComplex.Parser<T> => new ComplexParser(this, schema);
  readonly use = <T>(parser: IParser<T>) => ({ parse: parseChain<T>(this, parser.parse) });

  get not() {
    return new RootParser(this.isRequried, true);
  }
}
