import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import { api } from "@/services/api";
import { Meal, MealsResponse, Period } from "@/@types/dtos";
import { CreateMealSchema } from "@/components/NewMealDialog/schema";
import { parseDateToLocalUTC } from "@/lib/date";

type MealsQueryFilters = {
  period?: Period;
};

export const mealsQueryKeys = {
  all: () => ["meals"],
  list: (filters?: MealsQueryFilters) => [
    ...mealsQueryKeys.all(),
    "list",
    filters,
  ],
};

const getMealAmountSuffix = (meal: Meal) => {
  if (meal.food.portion_type === "grams") {
    return "g";
  }

  return meal.amount > 0 ? "unidades" : "unidades";
};

export const useMealsQuery = (filters?: MealsQueryFilters) => {
  return useQuery({
    queryKey: mealsQueryKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals", {
        params: filters,
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
      queryClient.invalidateQueries({
        queryKey: mealsQueryKeys.list({
          period: Period.TODAY,
        }),
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
      const queryKey = mealsQueryKeys.list({
        // TODO: get the period from the query params
        period: Period.TODAY,
      });

      const oldData = queryClient.getQueryData<MealsResponse>(queryKey);

      if (oldData) {
        const newData = oldData?.meals.filter(
          (meal) => meal.id !== deletedMealId
        );

        queryClient.setQueryData<MealsResponse>(queryKey, {
          ...oldData,
          meals: newData,
        });
      }

      if (onSuccess) {
        onSuccess(deletedMealId, data, context);
      }
    },
    ...mutationsProps,
  });
};
