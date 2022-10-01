import { IAnyOfBuilder } from '../IAnyOfBuilder';
import { IEqualsbuilder } from '../IEqualsbuilder';
import { IMinMaxBuilder } from '../IMinMaxBuilder';
import { NumberArrayOrEnumMap } from './NumberArrayOrEnumMap';

export interface IIntBuilder
  extends IEqualsbuilder<number>,
    IAnyOfBuilder<number, NumberArrayOrEnumMap>,
    IMinMaxBuilder<number> {}
