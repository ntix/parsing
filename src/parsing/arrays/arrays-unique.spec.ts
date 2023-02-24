import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-unique', () => {
  interface IThing {
    id: number
  }
  const thingParser = Is.object<IThing>({ id: Is.required.int });
  const parser = Is.array
    .each(thingParser)
    .minLength(2)
    .unique(t => t.id);

  it('success', () => {
    const value = [{ id: 1 }, { id: 2 }];
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('failure', () => {
    const value = [{ id: 1 }, { id: 1 }];
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.unique);
    expect(result.value).toEqual(value);
  });
});
