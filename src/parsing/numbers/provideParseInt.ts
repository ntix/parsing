import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { NumberParsableTypes } from './NumberParsableTypes';
import { tryParseInt } from './tryParseInt';

export function provideParseInt() {
  return (value: unknown): IParseResult<number> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    const numberValue = tryParseInt(value as NumberParsableTypes);
    return numberValue === null
      ? createParseResult(null, ParseErrors.int)
      : createParseResult(numberValue);
  };
}
