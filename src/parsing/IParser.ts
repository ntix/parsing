import { IParse } from './IParse';

export interface IParser<T, P = unknown> {
  parse: IParse<T, P>
}
