import { isDateType, isNullOrUndefined, isNumberType, isStringType } from '../../predicates';
import { DateParsableTypes } from './DateParsableTypes';
import { DATE_SETTINGS } from './DATE_SETTINGS';

/**
 * Attempt to parse a value to a date
 *
 * @param value to be parsed
 * @returns a date or null
 */
export function tryParseDate(value: DateParsableTypes): Date | null {
  if (isNullOrUndefined(value)) return value;
  if (value === '') return null;
  if (isDateType(value)) return value;

  if (isStringType(value)) {
    value = value.trim();

    // short dates where the browser parses differently to formatting
    if (DATE_SETTINGS.parseDayFirst !== DATE_SETTINGS.formatDayFirst) {
      const m = DATE_SETTINGS.shortRE.exec(value);
      if (m !== null) {
        value = `${m[2]}/${m[1]}/${m[3]}`;
      }
    }
  } else if (!isNumberType(value)) return null;

  const result = new Date(value);

  return Number.isNaN(result.valueOf()) ? null : result;
}
