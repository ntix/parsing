import { Schema } from '../../Schema';
import { parseDate } from '../dates';
import { ParseErrors } from '../ParseErrors';

describe('objects-parser', () => {
  const now = new Date();
  enum JobTypes {
    manager,
    developer,
    tester,
  }

  interface IPerson {
    name: {
      given?: string;
      family: string;
    };
    dateOfBirth: Date;
    jobType?: JobTypes;
    salary?: number;
  }

  const schema = Schema.object<IPerson>({
    name: Schema.required.object({
      given: Schema.string,
      family: Schema.required.string,
    }),
    dateOfBirth: Schema.required.date.max(now),
    jobType: Schema.int.anyOf(JobTypes),
    salary: Schema.float.min(0),
  });

  it('parse', () => {
    var value = {
      name: {
        family: 'FAMILY',
      },
      dateOfBirth: '2000-01-01',
    };

    const result = schema.parse(value);

    expect(result.success).toBe(true);
    expect(result.value).toEqual({
      name: value.name,
      dateOfBirth: parseDate(value.dateOfBirth),
    });
  });

  it('parse - invalid family name', () => {
    var value = {
      name: {},
      dateOfBirth: '2000-01-01',
    };

    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      name: { family: ParseErrors.required },
    });
  });

  it('parse - invalid DoB', () => {
    var value = {
      name: {
        family: 'FAMILY',
      },
      dateOfBirth: '3000-01-01',
    };

    const result = schema.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      dateOfBirth: ParseErrors.max(now),
    });
  });
});
