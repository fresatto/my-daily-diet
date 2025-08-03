import { CreateMealSchema } from "@/components/NewMealDialog/schema";
import { api } from "@/services/api";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const mealsQueryKeys = {
  all: () => ["meals"],
  list: () => [...mealsQueryKeys.all(), "list"],
  create: () => [...mealsQueryKeys.all(), "create"],
};

export const useCreateMealMutation = (
  mutationsProps?: Omit<
    UseMutationOptions<unknown, unknown, CreateMealSchema, unknown>,
    "mutationFn"
  >
) => {
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
      //   queryClient.invalidateQueries({
      //     queryKey: mealsQueryKeys.list(),
      //   });

      if (mutationsProps?.onSuccess) {
        mutationsProps.onSuccess(variables, data, context);
      }
    },
    ...mutationsProps,
  });
};
