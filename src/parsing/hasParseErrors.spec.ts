import { hasParseErrors } from './hasParseErrors';
import { IParseErrors } from './IParseErrors';
import { ParseErrors } from './ParseErrors';

describe('hasParseErrors', () => {
  [
    [null, false] as any,
    [undefined, false],
    [ParseErrors.empty, false],
    [ParseErrors.required, true],
    [{ required: true }, true]
  ].forEach(
    ([value, expectedResult]: [IParseErrors, boolean]) => {

      it(`${value} => ${expectedResult}`, () => {

        const result = hasParseErrors(value);
        expect(result).toBe(expectedResult);
      });
    })
})
