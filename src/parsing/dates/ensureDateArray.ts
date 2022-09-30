import { parseDate } from './parseDate';

export function ensureDateArray(values: (string | Date)[]): Date[] {
  return values.map(parseDate);
}
