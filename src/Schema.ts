import { RequiredValidator } from './parsing';

export class Schema extends RequiredValidator {
  private constructor() {
    super(false);
  }

  static get boolean() {
    return new Schema().boolean;
  }
  static get int() {
    return new Schema().int;
  }
  static get float() {
    return new Schema().float;
  }
  static get date() {
    return new Schema().date;
  }
  static get string() {
    return new Schema().string;
  }
  static get object() {
    return new Schema().object;
  }

  static get required() {
    return new RequiredValidator(true);
  }
}
