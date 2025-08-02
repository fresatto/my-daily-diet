export const foodsQueryKeys = {
  all: () => ["foods"],
  list: () => [...foodsQueryKeys.all(), "list"],
};
