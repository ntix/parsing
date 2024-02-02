import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { ComplexParser, ComplexSchema, IComplex } from '../complex';
import { parseChain } from '../parseChain';
import { IJson } from './IJson';
import { provideParseJson } from './provideParseJson';

export class JsonParser<T> implements IJson.Parser<T> {

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<T> = provideParseJson<T>()
  ) { }

  readonly parse = parseChain<T>(this.parent, this.parseCurrent);

  readonly for = <U>(schema: ComplexSchema<U>): IComplex.Parser<U> => new ComplexParser(this, schema);
  readonly use = <U>(parser: IParser<U>) => ({ parse: parseChain<U>(this, parser.parse) });
}
