export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  value === 0 ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);
