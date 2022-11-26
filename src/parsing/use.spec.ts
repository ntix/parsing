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

})
