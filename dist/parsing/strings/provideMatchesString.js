import { isNullOrEmpty, isStringType } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
export function provideMatchesString(matchValue, name, negate) {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        const re = isStringType(matchValue)
            ? new RegExp(matchValue)
            : matchValue;
        if (re.test(value) !== negate)
            return createParseResult(value);
        return createParseResult(value, ParseErrors.matches(name !== null && name !== void 0 ? name : matchValue));
    };
}
