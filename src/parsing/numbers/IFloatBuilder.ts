import { IAnyOfBuilder } from '../IAnyOfBuilder';
import { IEqualsbuilder } from '../IEqualsbuilder';
import { IMinMaxBuilder } from '../IMinMaxBuilder';

export interface IFloatBuilder
  extends IEqualsbuilder<number>,
    IAnyOfBuilder<number, number[]>,
    IMinMaxBuilder<number> {}
