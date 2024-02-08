import { IParser } from '../IParser';
import { ComplexParser, ComplexSchema, IComplex, provideParseComplex } from '../complex';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { IJson } from './IJson';
import { asCurrent } from '../asCurrent';

export class JsonParser<T> implements IJson.Parser<T> {

  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<T>,
    private negate = false
  ) { }

  readonly parse = parseChain<T>(this.parent, this.parseCurrent, 'JSON');

  readonly for = <U>(schema: ComplexSchema<U>): IComplex.Parser<U> => new ComplexParser(this, asCurrent(provideParseComplex<U>(schema), this.negate));
  readonly use = <U>(parser: ICurrentParser<U>) => ({ parse: parseChain<U>(this, { ...this.parseCurrent, parse: parser.parse }, 'JSON-USE') });
}
