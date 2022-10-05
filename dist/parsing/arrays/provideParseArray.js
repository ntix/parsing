import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
export function provideParseArray() {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        if (Array.isArray(value))
            return createParseResult(value);
        return createParseResult(null, ParseErrors.array);
    };
}
