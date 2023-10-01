import { isNullOrEmpty, isStringType } from '../../predicates';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';


export function provideParseJson<T>() {

    return (value: T): IParseResult<T> => {
        if (isNullOrEmpty(value))
            return createParseResult(null);

        if (isStringType(value))
            try {
                const parsed = JSON.parse(value);

                return createParseResult(parsed as T);
            } catch (error) {
                console.warn(error);
            }

        return createParseResult(null, ParseErrors.json);
    };
}
