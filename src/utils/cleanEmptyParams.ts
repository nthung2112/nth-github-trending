export const cleanEmptyParams = <T extends Record<string, unknown>>(search: T) => {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (value === undefined || value === "" || (typeof value === "number" && isNaN(value)))
      delete newSearch[key];
  });

  return newSearch;
};
