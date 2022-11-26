import { Is } from '../Is'
import { ParseErrors } from './ParseErrors';

describe('use', () => {

  const useParser = Is.required;

  it('useParser errors', () => {

    const parser = Is.use(useParser);
    const result = parser.parse(null);

    expect(result.errors).toEqual(ParseErrors.required);
  });

  it('replaced errors', () => {

    const errors = { replaced: true };

    const parser = Is.use(useParser, () => errors);
    const result = parser.parse(null);

    expect(result.errors).toEqual(errors);
  });

  it('wrapped errors', () => {

    const errors = { wrapped: ParseErrors.required };

    const parser = Is.use(useParser, errors => ({ wrapped: errors }));
    const result = parser.parse(null);

    expect(result.errors).toEqual(errors);
  });

  describe('add rule parser', () => {
    const length = 2;
    const intParser = Is
      .string
      .minLength(length)
      .maxLength(length);

    it('make required', () => {

      const requiredIntParser = Is.required.use(intParser);
      const result = requiredIntParser.parse(undefined);

      expect(result.errors).toEqual(ParseErrors.required);
    });

    it('as property', () => {

      const objectParser = Is.object({
        id: Is.required.use(intParser)
      });

      const result = objectParser.parse({ id: null });

      expect(result.errors.id).toEqual(ParseErrors.required);
    });
  });
});
