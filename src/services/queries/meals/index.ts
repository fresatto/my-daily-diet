import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import { api } from "@/services/api";
import { Meal, MealsResponse } from "@/@types/dtos";
import { CreateMealSchema } from "@/components/NewMealDialog/schema";
import { parseDateToLocalUTC } from "@/lib/date";
import { weekProgressQueryKeys } from "../week-progress";
import { dailyGoalQueryKeys } from "../daily-goal";

type MealsQueryFilters = {
  startDate: string;
};

export const mealsQueryKeys = {
  all: () => ["meals"],
  listSuspense: (filters?: MealsQueryFilters) => [
    ...mealsQueryKeys.all(),
    "listSuspense",
    filters,
  ],
};

const getMealAmountSuffix = (meal: Meal) => {
  if (meal.food.portion_type === "grams") {
    return "g";
  }

  return meal.amount > 0 ? "unidades" : "unidades";
};

const getMealsStartDate = (filters?: MealsQueryFilters) => {
  if (filters?.startDate) {
    return filters.startDate;
  }

  return format(new Date(), "yyyy-MM-dd");
};

export const useMealsSuspenseQuery = (filters?: MealsQueryFilters) => {
  const startDate = getMealsStartDate(filters);

  return useSuspenseQuery({
    queryKey: mealsQueryKeys.listSuspense({ startDate }),
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals", {
        params: {
          startDate,
        },
      });

      if (response.status !== 200) {
        toast.error("Erro ao buscar refeições");

        return {
          meals: [],
        };
      }

      return response.data;
    },
    select: (data) => {
      try {
        const meals = data.meals.map((meal) => {
          const localDate = parseDateToLocalUTC(meal.created_at);
          const amountSuffix = getMealAmountSuffix(meal);
          const formattedAmount = `${meal.amount}${amountSuffix}`;
          const formattedTime = format(localDate, "'às' HH:mm");

          return {
            ...meal,
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
    staleTime: 1000 * 60 * 5, // 5 minutes,
  });
};

export const useCreateMealMutation = ({
  onSuccess,
  ...mutationsProps
}: Omit<
  UseMutationOptions<unknown, unknown, CreateMealSchema, unknown>,
  "mutationFn"
>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const formattedPayload = {
        ...data,
        amount: Number(data.amount),
      };

      const response = await api.post("/meals", formattedPayload);

      return response.data;
    },
    onSuccess: (variables, data, context) => {
      const startDate = getMealsStartDate();

      queryClient.invalidateQueries({
        queryKey: mealsQueryKeys.listSuspense({ startDate }),
      });

      queryClient.invalidateQueries({
        queryKey: weekProgressQueryKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: dailyGoalQueryKeys.get(),
      });

      queryClient.invalidateQueries({
        queryKey: dailyGoalQueryKeys.getSummary(),
      });

      if (onSuccess) {
        onSuccess(variables, data, context);
      }
    },
    onError: () => {
      toast.error("Erro ao cadastrar refeição");
    },
    ...mutationsProps,
  });
};

export const useDeleteMealMutation = ({
  onSuccess,
  ...mutationsProps
}: Omit<
  UseMutationOptions<unknown, unknown, string, unknown>,
  "mutationFn"
>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/meals/${id}`);

      return id;
    },
    onSuccess: (deletedMealId, data, context) => {
      const startDate = getMealsStartDate();

      const listMealsQueryKey = mealsQueryKeys.listSuspense({ startDate });

      const oldData =
        queryClient.getQueryData<MealsResponse>(listMealsQueryKey);

      if (oldData) {
        const newData = oldData?.meals.filter(
          (meal) => meal.id !== deletedMealId
        );

        queryClient.setQueryData<MealsResponse>(listMealsQueryKey, {
          ...oldData,
          meals: newData,
        });
      }

      queryClient.invalidateQueries({
        queryKey: weekProgressQueryKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: dailyGoalQueryKeys.get(),
      });

      queryClient.invalidateQueries({
        queryKey: dailyGoalQueryKeys.getSummary(),
      });

      if (onSuccess) {
        onSuccess(deletedMealId, data, context);
      }
    },
    ...mutationsProps,
  });
};
