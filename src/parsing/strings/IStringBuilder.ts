import { IAnyOfBuilder } from '../IAnyOfBuilder';
import { IEqualsbuilder } from '../IEqualsbuilder';
import { IMinMaxLengthBuilder } from '../IMinMaxLengthBuilder';

export interface IStringBuilder
  extends IEqualsbuilder<string>,
    IAnyOfBuilder<string, string[]>,
    IMinMaxLengthBuilder<string> {}
