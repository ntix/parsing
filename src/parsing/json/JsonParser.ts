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

  readonly for = <T>(schema: ComplexSchema<T>): IComplex.Parser<T> => new ComplexParser(this, schema);
  readonly use = <T>(parser: IParser<T>) => ({ parse: parseChain<T>(this, parser.parse) });
}
