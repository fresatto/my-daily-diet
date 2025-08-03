import { MealsResponse, Period } from "@/@types/dtos";
import { CreateMealSchema } from "@/components/NewMealDialog/schema";
import { api } from "@/services/api";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

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

export const useMealsQuery = (
  filters?: MealsQueryFilters,
  queryProps?: Omit<UseQueryOptions<MealsResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: mealsQueryKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals", {
        params: filters,
      });

      return response.data;
    },
    ...queryProps,
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
    ...mutationsProps,
  });
};
