import { isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseBoolean } from './tryParseBoolean';

export function provideParseBoolean() {
  return (value: unknown): IParseResult<boolean> => {
    if (isNullOrUndefined(value))
      return createParseResult(value);
    if (value === '')
      return createParseResult(null);

    const booleanValue = tryParseBoolean(value);
    return booleanValue == null
      ? createParseResult(booleanValue, ParseErrors.boolean)
      : createParseResult(booleanValue as boolean);
  };
}
