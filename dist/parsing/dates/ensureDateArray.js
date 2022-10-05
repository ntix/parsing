import { parseDate } from './parseDate';
export function ensureDateArray(values) {
    return values.map(parseDate);
}
