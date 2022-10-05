import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
/**
 * Validate a value is a maximum
 */
export function provideMax(maxValue, exclusive, negate) {
    return (value) => {
        if (isNullOrEmpty(value)
            || (exclusive ? value < maxValue : value <= maxValue) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.max(maxValue, exclusive);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
