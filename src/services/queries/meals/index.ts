import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import { api } from "@/services/api";
import { CreateMealSchema } from "@/components/NewMealDialog/schema";
import { getTimeZone, parseDateToLocalUTC } from "@/lib/date";
import { weekProgressQueryKeys } from "../week-progress";
import { dailyGoalQueryKeys } from "../daily-goal";
import { FormattedMeal, Meal, MealsResponse } from "@/@types/meal";
import { consumedMealsQueryKeys } from "../consumed-meals";

type MealsQueryFilters = {
  startDate: string;
};

export const mealsQueryKeys = {
  all: () => ["meals"],
  list: (filters?: MealsQueryFilters) => [
    ...mealsQueryKeys.all(),
    "listSuspense",
    filters,
  ],
};

const getMealsStartDate = (filters?: MealsQueryFilters) => {
  if (filters?.startDate) {
    return filters.startDate;
  }

  return format(new Date(), "yyyy-MM-dd");
};

export const useMealsQuery = (filters?: MealsQueryFilters) => {
  const startDate = getMealsStartDate(filters);
  const timezone = getTimeZone();

  return useQuery({
    queryKey: mealsQueryKeys.list({ startDate }),
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals", {
        params: {
          startDate,
          timezone,
        },
      });

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
            formattedAmount,
            formattedTime,
            created_at: format(localDate, "dd/MM/yyyy HH:mm"),
          } as FormattedMeal;
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
  UseMutationOptions<Meal, unknown, CreateMealSchema, unknown>,
  "mutationFn"
>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/meals", data);

      return response.data;
    },
    onSuccess: (variables, data, context) => {
      const startDate = getMealsStartDate();

      queryClient.invalidateQueries({
        queryKey: mealsQueryKeys.list({ startDate }),
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

      const listMealsQueryKey = mealsQueryKeys.list({ startDate });

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
        queryKey: dailyGoalQueryKeys.getSummary(),
      });

      queryClient.invalidateQueries({
        queryKey: consumedMealsQueryKeys.list(),
      });

      if (onSuccess) {
        onSuccess(deletedMealId, data, context);
      }
    },
    ...mutationsProps,
  });
};
