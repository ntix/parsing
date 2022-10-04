import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { IParseResult } from '../IParseResult';
import { tryParseFloat } from './tryParseFloat';

export function provideParseFloat() {
  return (value: unknown): IParseResult<number> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const numberValue = tryParseFloat(value as NumberParsableTypes);
    return numberValue === null
      ? createParseResult(null, ParseErrors.float)
      : createParseResult(numberValue);
  };
}
