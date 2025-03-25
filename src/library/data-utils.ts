export const sortBy = (field = '', asc = false) => (a, b) => {
  if (a[field] < b[field]) return asc ? 1 : -1;
  if (a[field] > b[field]) return asc ? -1 : 1;
  return 0;
}
