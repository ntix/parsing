import { IAnyOfBuilder } from '../IAnyOfBuilder';
import { IEqualsbuilder } from '../IEqualsbuilder';

export interface IStringBuilder extends IEqualsbuilder<string>, IAnyOfBuilder<string, string[]> {}
