import { toast } from "sonner";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "@/services/api";
import { FoodsResponse } from "@/@types/dtos";
import { AxiosError } from "axios";

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

export function useDeleteFoodMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (foodId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await api.delete(`/food/${foodId}`);

      return foodId;
    },
    onSuccess: (foodId) => {
      const foods = queryClient.getQueryData<FoodsResponse>(
        foodsQueryKeys.list()
      );

      toast.success("Alimento deletado com sucesso");

      if (foods) {
        queryClient.setQueryData(foodsQueryKeys.list(), {
          foods: foods.foods.filter((food) => food.id !== foodId),
        });
      }
    },
    onError: (error) => {
      const isAxiosError = error instanceof AxiosError;

      if (isAxiosError) {
        return toast.error(error.response?.data.error);
      }

      toast.error("Não foi possível deletar o alimento");
    },
  });
}
