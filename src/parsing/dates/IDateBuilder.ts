import { IEqualsbuilder } from '../IEqualsbuilder';
import { IAnyOfBuilder } from '../IAnyOfBuilder';
import { IMinMaxBuilder } from '../IMinMaxBuilder';
import { DateParsable } from './DateParsable';

export interface IDateBuilder
  extends IEqualsbuilder<Date, DateParsable>,
    IAnyOfBuilder<Date, DateParsable[]>,
    IMinMaxBuilder<Date> {}
