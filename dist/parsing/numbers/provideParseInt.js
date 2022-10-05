import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseInt } from './tryParseInt';
export function provideParseInt() {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        const numberValue = tryParseInt(value);
        return numberValue === null
            ? createParseResult(null, ParseErrors.int)
            : createParseResult(numberValue);
    };
}
