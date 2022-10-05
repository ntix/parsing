import { isEqual, isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
export function provideEquals(equalToValue, negate) {
    return (value) => {
        if (isNullOrEmpty(value) || isEqual(value, equalToValue) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.equals(equalToValue);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
