import { isEqual, isNullOrEmpty, isObject } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { ComplexSchema } from './ComplexSchema';
import { IParse } from '../IParse';
import { IParseErrors } from '../IParseErrors';

/**
 * provides a parse method for object typed as T
 *
 * @param schema a complex schema
 * @returns parser
 */
export function provideParseComplex<T>(
  schema: ComplexSchema<T>
): IParse<T> {

  return (value: unknown) => {
    let success = true;
    let errors: IParseErrors = ParseErrors.complex;

    if (isObject(value) && !isNullOrEmpty(value)) {

      const result = Object
        .keys(schema)
        .reduce<IParseResult<T>>((ar, k) => {
          const r = schema[k].parse(value[k]);
          const v = r.value == null
            ? ar.value
            : {
              ...ar.value,
              [k]: r.value
            };
          const e = isEqual(r.errors, ParseErrors.empty)
            ? ar.errors
            : {
              ...ar.errors,
              [k]: r.errors
            };

          return createParseResult(v, e);
        }, createParseResult(value as T));

      value = result.value;
      success = result.success;
      if (!success) errors = result.errors;
    }

    return {
      value: value as T,
      success,
      errors: errors
    };
  };
}
