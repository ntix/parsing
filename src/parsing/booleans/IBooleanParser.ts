import { IParser } from '../IParser';
import { IBooleanBuilder } from './IBooleanBuilder';

export interface IBooleanParser extends IParser<boolean>, IBooleanBuilder {
  readonly not: IBooleanBuilder;
}
