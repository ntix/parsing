export function isBooleanType(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
