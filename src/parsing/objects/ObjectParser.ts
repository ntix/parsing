import { isEqual, isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParser } from '../IParser';
import { IParseResult } from '../IParseResult';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';
import { IObjectParser } from './IObjectParser';
import { ObjectSchema } from './ObjectSchema';

export class ObjectParser<T> implements IObjectParser<T> {
  constructor(private parent: IParser<any>, private schema: ObjectSchema<T>) {}

  readonly parse = parseChain(this.parent, (originalValue) => {
    if (isNullOrEmpty(originalValue)) return createParseResult(null);

    return Object.keys(this.schema).reduce<IParseResult<T>>((r, key) => {
      const result = this.schema[key].parse(originalValue[key]);
      const value =
        result.value == null
          ? r.value
          : {
              ...r.value,
              [key]: result.value,
            };
      const errors = isEqual(result.errors, ParseErrors.empty)
        ? r.errors
        : {
            ...r.errors,
            [key]: result.errors,
          };

      return createParseResult(value, errors);
    }, createParseResult(originalValue));
  });
}
