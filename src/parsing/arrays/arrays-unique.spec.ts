import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('arrays-unique', () => {
  interface IThing {
    id: number
  }
  const thingSchema = Is.for<IThing>({ id: Is.required.int });
  const schema = Is.array
    .each(thingSchema)
    .minLength(2)
    .unique(t => t.id);

  it('success', () => {
    const value = [{ id: 1 }, { id: 2 }];
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('failure', () => {
    const value = [{ id: 1 }, { id: 1 }];
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.unique);
    expect(result.value).toEqual(value);
  });

  describe('not', () => {
    const notSchema = Is.array
      .each(thingSchema)
      .not.unique(t => t.id);

    it('success', () => {
      const value = [{ id: 1 }, { id: 1 }];
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual(value);
    });

    it('failure', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const result = notSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.unique));
      expect(result.value).toEqual(value);
    });
  });
});
