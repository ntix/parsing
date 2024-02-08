import { IParse } from './IParse';

/**
 * A parser 
 */
export interface IParser<T> {
  parse: IParse<T>
}
