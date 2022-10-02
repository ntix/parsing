import { IParser } from './IParser';
import { IRootBuilder } from './IRootBuilder';

export interface IRootParser extends IRootBuilder, IParser<any> {}
