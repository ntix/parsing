import { Is } from '../../Is';
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
    emails?: {
      name: string;
      address: string;
    }[];
  }

  const GIVEN_NAME_MAX_LENGTH = 25;
  const FAMILY_NAME_MAX_LENGTH = 50;

  const nameParser = Is.object({
    given: Is.string.maxLength(GIVEN_NAME_MAX_LENGTH),
    family: Is.required.string.maxLength(FAMILY_NAME_MAX_LENGTH),
  });

  // const emailParser = Is.object({
  //   name: Is.required.string,
  //   address: Is.required.string,
  // });

  const personParser = Is.object<IPerson>({
    name: Is.required.use(nameParser),
    dateOfBirth: Is.required.date.max(now),
    jobType: Is.int.anyOf(JobTypes),
    salary: Is.float.min(0),
    //emails: Is.many.min(1).each.use(emailParser)
  });

  it('parse', () => {
    var value = {
      name: {
        family: 'FAMILY',
      },
      dateOfBirth: '2000-01-01',
    };

    const result = personParser.parse(value);

    expect(result.success).toBe(true);
    expect(result.value).toEqual({
      name: value.name,
      dateOfBirth: parseDate(value.dateOfBirth),
    });
  });

  it('parse - invalid name', () => {
    var value = {
      name: null,
      dateOfBirth: '2000-01-01',
    };

    const result = personParser.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      name: ParseErrors.required,
    });
  });

  it('parse - invalid family name', () => {
    var value = {
      name: { family: 'X'.repeat(100) },
      dateOfBirth: '2000-01-01',
    };

    const result = personParser.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      name: { family: ParseErrors.maxLength(FAMILY_NAME_MAX_LENGTH) },
    });
  });

  it('parse - invalid DoB', () => {
    var value = {
      name: {
        family: 'FAMILY',
      },
      dateOfBirth: '3000-01-01',
    };

    const result = personParser.parse(value);

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      dateOfBirth: ParseErrors.max(now),
    });
  });
});
