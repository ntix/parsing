import { isEqual, isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';

/**
 * Validate a value is any of values passed
 */
export function provideAnyOfString(
  values: string[], ignoreCase: boolean, negate: boolean
) {

  return (value: string) => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const a = ignoreCase ? value.toLowerCase() : value;
    const b = ignoreCase ? values.map(v => v.toLowerCase()) : values;

    if (b.some(v => isEqual(v, a)) !== negate)
      return createParseResult(value);

    const errors = negate
      ? ParseErrors.not(ParseErrors.anyOf(values))
      : ParseErrors.anyOf(values);

    return createParseResult(value, errors);
  };
}
