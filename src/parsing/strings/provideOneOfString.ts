import { isEqual, isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';

/**
 * Validate a value is one of values passed
 */
export function provideOneOfString(
  values: string[], ignoreCase: boolean, negate: boolean
) {

  return (value: string) => {
    if (isNullOrUndefined(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? values.map(v => v.toLowerCase()) : values;

    if (b.some(v => isEqual(v, a)) !== negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.oneOf(values))
      : ParseErrors.oneOf(values);

    return createParseResult(value, errors);
  };
}
