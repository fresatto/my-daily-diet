import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { format } from "date-fns-tz";

import { parseDateToLocalUTC } from "@/lib/date";
import { api } from "@/services/api";
import { MealsResponse } from "@/@types/meal";
import { CreateConsumedMealRequest } from "@/@types/consumed-meals";

export const consumedMealsQueryKeys = {
  base: () => ["consumed-meals"],
  list: () => [...consumedMealsQueryKeys.base(), "list"],
};

export const useConsumedMealsQuery = () => {
  return useQuery({
    queryKey: consumedMealsQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/consumed-meals");

      return response.data;
    },
    select: (data) => {
      try {
        const meals = data.meals.map((meal) => {
          const localDate = parseDateToLocalUTC(meal.created_at);
          const amountSuffix = "g";
          const formattedAmount = `${100}${amountSuffix}`;
          const formattedTime = format(localDate, "'às' HH:mm");

          return {
            ...meal,
            meal: meal.name,
            formattedAmount,
            formattedTime,
            created_at: format(localDate, "dd/MM/yyyy HH:mm"),
          };
        });

        return {
          meals,
        };
      } catch {
        throw new Error("Erro ao formatar as refeições.");
      }
    },
  });
};

export const useConsumedMealsMutation = (
  options: Omit<
    UseMutationOptions<unknown, unknown, CreateConsumedMealRequest, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: async ({ meal_id }: CreateConsumedMealRequest) => {
      const response = await api.post("/consumed-meals", {
        meal_id,
      });

      return response.data;
    },
    ...options,
  });
};
