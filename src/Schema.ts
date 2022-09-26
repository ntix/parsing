import { RequiredValidator } from './parsing';

export class Schema extends RequiredValidator {
  constructor() {
    super(null);
  }

  required() {
    return new RequiredValidator(this);
  }
}
