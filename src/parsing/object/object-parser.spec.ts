import { Is } from '../../Is';
import { isOneOf } from '../../predicates';
import { parseDate } from '../dates';
import { ParseErrors } from '../ParseErrors';
import { If } from '../If';

describe('object-parser', () => {

  it('parse', () => {
    const value = valid;

    const result = personParser.parse(value);

    expect(result.value).toEqual({
      name: value.name,
      dateOfBirth: parseDate(value.dateOfBirth),
      emails: value.emails,
      scores: value.scores
    });
    expect(result.errors).toEqual(ParseErrors.empty);
  });

  it('parse undefined', () => {
    const value = undefined;

    const result = personParser.parse(value);

    expect(result.value).toEqual(value);
    expect(result.errors).toEqual(ParseErrors.empty);
  });

  it('parse null', () => {
    const value = null;

    const result = personParser.parse(value);

    expect(result.value).toEqual(value);
    expect(result.errors).toEqual(ParseErrors.empty);
  });

  it('parse required null', () => {
    const value = null;

    const result = Is.required.use(personParser).parse(value);

    expect(result.value).toEqual(null);
    expect(result.errors).toEqual(ParseErrors.required);
  });

  it('parse - invalid job type', () => {
    const value = {
      ...valid,
      jobType: -1
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ jobType: ParseErrors.oneOf(JobTypes) });
  });

  it('parse - valid job type, invalid salary', () => {
    const value = {
      ...valid,
      jobType: JobTypes.developer,
      salary: null
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ salary: ParseErrors.required });
  });

  it('parse - invalid null scores', () => {
    const value = {
      ...valid,
      scores: null
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ scores: ParseErrors.required });
  });

  it('parse - invalid scores not number', () => {
    const value = {
      ...valid,
      scores: ['a']
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ scores: { '0': { float: true } } });
  });

  it('parse - invalid emails minLength', () => {
    const value = {
      ...valid,
      emails: []
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ emails: ParseErrors.minLength(EMAILS_MIN_LENGTH) });
  });

  it('parse - invalid email name', () => {
    const value = {
      ...valid,
      emails: [{ name: null, address: 'email@example.com' }]
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ emails: { [0]: { name: ParseErrors.required } } });
  });

  it('parse - invalid email address', () => {
    const value = {
      ...valid,
      emails: [{ ...valid.emails[0], address: 'email@example.co.uk' }]
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ emails: { [0]: { address: ParseErrors.matches('email') } } });
  });

  it('parse - invalid name', () => {
    const value = {
      ...valid,
      name: null
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({ name: ParseErrors.required });
  });

  it('parse - invalid family name', () => {
    const value = {
      ...valid,
      name: {
        family: 'X'.repeat(100)
      }
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({
      name: {
        family: ParseErrors.maxLength(FAMILY_NAME_MAX_LENGTH)
      }
    });
  });

  it('parse - invalid DoB', () => {
    const value = {
      ...valid,
      dateOfBirth: '3000-01-01'
    };

    const result = personParser.parse(value);

    expect(result.errors).toEqual({
      dateOfBirth: ParseErrors.max(now, false)
    });
  });

  /** data */
  const now = new Date();
  const valid = {
    name: {
      family: 'FAMILY'
    },
    dateOfBirth: '2000-01-01',
    emails: [{ name: 'work', address: 'email@example.com' }],
    scores: []
  };

  /** Models */
  enum JobTypes { manager, developer, tester }

  interface IEmail {
    name: string
    address: string
  }

  interface IPerson {
    name: {
      given?: string,
      family: string
    }
    dateOfBirth: Date,
    jobType?: JobTypes,
    salary?: number,
    scores: number[],
    emails?: IEmail[]
  }

  /** Parsers */
  const GIVEN_NAME_MAX_LENGTH = 25;
  const FAMILY_NAME_MAX_LENGTH = 50;

  const nameParser = Is.object({
    given: Is.string.maxLength(GIVEN_NAME_MAX_LENGTH),
    family: Is.required.string.maxLength(FAMILY_NAME_MAX_LENGTH)
  });

  const emailParser = Is.object<IEmail>({
    name: Is.required.string,
    address: Is.required.string.matches(/.*?\.com/, 'email')
  });

  const EMAILS_MIN_LENGTH = 1;

  const personParser = Is.object<IPerson>({
    name: Is.required.use(nameParser),
    dateOfBirth: Is.required.date.max(now),
    jobType: Is.int.oneOf(JobTypes),
    salary: If(
      p => isOneOf(p.jobType, JobTypes),
      Is.required.float.min(0),
      Is.float.min(0)
    ),
    scores: Is.required.array.each(Is.float),
    emails: Is.array.each(emailParser).minLength(EMAILS_MIN_LENGTH)
  });
});
