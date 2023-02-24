import { IParser } from '../IParser';

export namespace IObject {

  export interface Parser<T = unknown> extends IParser<T> { }
}
