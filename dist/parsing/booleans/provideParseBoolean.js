import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseBoolean } from './tryParseBoolean';
export function provideParseBoolean() {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        value = tryParseBoolean(value);
        return (value === null)
            ? createParseResult(null, ParseErrors.boolean)
            : createParseResult(value);
    };
}
