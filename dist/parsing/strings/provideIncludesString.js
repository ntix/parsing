import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
export function provideIncludesString(includesValue, ignoreCase = false, negate) {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        if (ignoreCase) {
            value = value.toLowerCase();
            includesValue = includesValue.toLowerCase();
        }
        if (value.includes(includesValue) !== negate)
            return createParseResult(value);
        return createParseResult(value, ParseErrors.includes(value, ignoreCase));
    };
}
