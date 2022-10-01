import { IIntParserRadix } from './IIntParserRadix';

export interface IIntParser extends IIntParserRadix {
  withRadix(value: number): IIntParserRadix;
}
