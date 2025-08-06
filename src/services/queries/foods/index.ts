import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/services/api";
import { FoodsResponse } from "@/@types/dtos";

export const foodsQueryKeys = {
  all: () => ["foods"],
  list: () => [...foodsQueryKeys.all(), "list"],
};

export function useFoodsQuery(
  queryProps?: Omit<
    UseQueryOptions<FoodsResponse>,
    "queryKey" | "queryFn" | "select"
  >
) {
  return useQuery({
    queryKey: foodsQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get<FoodsResponse>("/food");

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    select: (data) => {
      const formattedFoods = data.foods.map((food) => {
        const formattedPortionType =
          food.portion_type === "grams" ? "g" : "unidade";

        return {
          ...food,
          formattedPortionType,
        };
      });

      return {
        foods: formattedFoods,
      };
    },
    ...queryProps,
  });
}
