import { isEqual, isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { ObjectSchema } from './ObjectSchema';

/**
 * parse an object
 *
 * @returns an object, undefined or null
 */

export function provideParseObject<T>(
  schema: ObjectSchema<T>
) {
  return (originalValue: unknown): IParseResult<T> => {
    if (isNullOrUndefined(originalValue))
      return createParseResult(originalValue);
    if (originalValue === '')
      return createParseResult(null);

    return Object
      .keys(schema)
      .reduce<IParseResult<T>>((r, key) => {
        const result = schema[key].parse(originalValue[key], originalValue);
        const value = result.value == null
          ? r.value
          : {
            ...r.value,
            [key]: result.value
          };
        const errors = isEqual(result.errors, ParseErrors.empty)
          ? r.errors
          : {
            ...r.errors,
            [key]: result.errors
          };

        return createParseResult(value, errors);
      }, createParseResult(originalValue as T));
  };
}
