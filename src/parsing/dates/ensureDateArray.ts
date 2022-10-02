import { DateParsableTypes } from './DateParsableTypes';
import { parseDate } from './parseDate';

export function ensureDateArray(values: DateParsableTypes[]): Date[] {
  return values.map(parseDate);
}
