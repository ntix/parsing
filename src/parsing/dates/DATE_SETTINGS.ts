export const DATE_SETTINGS = {
  shortRE: /^(\d{1,2})[^\d-](\d{1,2})[^\d-](\d{2}|\d{4})$/,

  formatDayFirst: new Date(2000, 1, 1)
    .toLocaleString('default', { day: '2-digit', month: '2-digit' })
    .replace(/[^\d]/g, '/') === '01/02',
  parseDayFirst: new Date('1/2/2000').getDate() == 1
};
