import { IMinMaxLengthBuilder } from '../IMinMaxLengthBuilder';
import { IParser } from '../IParser';

export interface IArrayParser extends IParser<any[]>, IMinMaxLengthBuilder<any[]> {}
