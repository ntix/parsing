import { DateParsable } from './DateParsable';
import { parseDate } from './parseDate';

export function ensureDateArray(values: DateParsable[]): Date[] {
  return values.map(parseDate);
}
