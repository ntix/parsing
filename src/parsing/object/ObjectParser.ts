import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { IObject } from './IObject';
import { ObjectSchema } from './ObjectSchema';
import { provideParseObject } from './provideParseObject';

export class ObjectParser<T> implements IObject.Parser<T> {
  constructor(
    private parent: IParser<unknown>,
    private schema: ObjectSchema<T>
  ) { }

  readonly parse = parseChain(this.parent, provideParseObject<T>(this.schema));
}
