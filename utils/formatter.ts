export const dateFormatter = (date: string | number, fallback: string = "") => {
  if (!date) return fallback;
  return new Date(date).toLocaleDateString();
};