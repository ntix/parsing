import { DateParsableTypes } from './DateParsableTypes';
import { parseDate } from './parseDate';

export function parseDateArray(values: DateParsableTypes[]): Date[] {
  return values.map(parseDate);
}
