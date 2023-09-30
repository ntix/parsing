import { IParse } from '../IParse';
import { IParseResult } from '../IParseResult';
import { createParseResult } from '../createParseResult';
import { Dictionary } from './Dictionary';

/**
 * parse all properties on an object (Dictionary)
 *
 * @param parse function
 * @returns IParseResult<Dictionary<T>>
 */
export function parseAllDictionary<T>(
    parse: IParse<T>
): IParse<Dictionary<T>> {

    return value => {
        if (value == null) return createParseResult(null);

        return Object.keys(value).reduce<IParseResult<Dictionary<T>>>(
            (r, n) => {

                const result = parse(value[n]);
                const errors = result.success
                    ? r.errors
                    : { ...r.errors, [n]: result.errors };

                return createParseResult(
                    { ...r.value, [n]: result.value },
                    errors
                );

            }, createParseResult<Dictionary<T>>({})
        );
    };
}
