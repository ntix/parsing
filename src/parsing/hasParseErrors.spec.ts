import { hasParseErrors } from './hasParseErrors';
import { IParseErrors } from './IParseErrors';
import { Nullable } from './Nullable';
import { ParseErrors } from './ParseErrors';

describe('hasParseErrors', () => {
  [
    [null, false],
    [undefined, false],
    [ParseErrors.empty, false],
    [ParseErrors.required, true],
    [{ required: true }, true]
  ].forEach(
    ([value, expectedResult]) => {

      it(`${value} => ${expectedResult}`, () => {

        const result = hasParseErrors(value as Nullable<IParseErrors>);
        expect(result).toBe(expectedResult);
      });
    }
  );
});
