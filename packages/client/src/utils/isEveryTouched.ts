export const isEveryTouched = (touched: { [key: string]: boolean }) => {
  if (Object.keys(touched).length === 0) return false;
  return Object.values(touched).every(Boolean);
};
