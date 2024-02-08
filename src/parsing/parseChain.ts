import { IParser } from './IParser';
import { createParseResult } from './createParseResult';
import { IParse } from './IParse';
import { ParseErrors } from './ParseErrors';
import { ICurrentParser } from './ICurrentParser';

/**
 * Gets a chained, parent and current parser
 * 
 * @param parent parent parser
 * @param current current parser
 * @param _parserName name for debugging
 * @returns a chained parse function
 */
export function parseChain<T>(
  parent: IParser<unknown>,
  current: ICurrentParser<T>,
  _parserName: string
): IParse<T> {

  return (value: unknown) => {

    let result = createParseResult(value);

    if (parent != null)
      result = parent.parse(result.value);

    const currentResult = current.parse(result.value);

    return createParseResult(
      currentResult.value,
      {
        ...result.errors,
        ...currentResult.success !== current.negate // negate the result if needed
          ? ParseErrors.empty
          : current.negate
            ? ParseErrors.not(currentResult.errors)
            : currentResult.errors
      }
    );
  };
}
