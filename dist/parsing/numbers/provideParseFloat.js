import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseFloat } from './tryParseFloat';
export function provideParseFloat() {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        const numberValue = tryParseFloat(value);
        return numberValue === null
            ? createParseResult(null, ParseErrors.float)
            : createParseResult(numberValue);
    };
}
