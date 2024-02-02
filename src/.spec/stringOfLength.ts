export const stringOfLength
    : (length: number) => string
    = length => Array.from({ length }, (_, i) => i.toString()).join('');
