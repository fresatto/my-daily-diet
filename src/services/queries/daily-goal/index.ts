import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { api } from "@/services/api";
import {
  DailyGoalRequest,
  DailyGoalResponse,
  DailyGoalSummaryResponse,
} from "@/@types/daily-goal";

export const dailyGoalQueryKeys = {
  all: () => ["dailyGoal"],
  get: () => [...dailyGoalQueryKeys.all(), "get"],
  getSuspense: () => [...dailyGoalQueryKeys.all(), "getSuspense"],
  getSummary: () => [...dailyGoalQueryKeys.all(), "getSummary"],
  getSummarySuspense: () => [...dailyGoalQueryKeys.all(), "getSummarySuspense"],
  update: () => [...dailyGoalQueryKeys.all(), "update"],
};

export function useDailyGoalQuery() {
  return useQuery({
    queryKey: dailyGoalQueryKeys.get(),
    queryFn: async () => {
      const response = await api.get<DailyGoalResponse>("/daily-goal");

      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 5, // 5 minutes
  });
}

export function useDailyGoalSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: dailyGoalQueryKeys.getSuspense(),
    queryFn: async () => {
      const response = await api.get<DailyGoalResponse>("/daily-goal");

      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 5, // 5 minutes
  });
}

export function useDailyGoalSummarySuspenseQuery() {
  return useSuspenseQuery({
    queryKey: dailyGoalQueryKeys.getSummarySuspense(),
    queryFn: async () => {
      const response = await api.get<DailyGoalSummaryResponse>(
        "/daily-goal/summary"
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 5, // 5 minutes
  });
}

export function useDailyGoalSummaryQuery() {
  return useQuery({
    queryKey: dailyGoalQueryKeys.getSummary(),
    queryFn: async () => {
      const response = await api.get<DailyGoalSummaryResponse>(
        "/daily-goal/summary"
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 5, // 5 minutes
  });
}

export function useDailyGoalMutation(
  props?: Omit<
    UseMutationOptions<unknown, unknown, DailyGoalRequest, unknown>,
    "mutationFn"
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: dailyGoalQueryKeys.update(),
    mutationFn: async (data: DailyGoalRequest) => {
      const response = await api.post<DailyGoalResponse>("/daily-goal", data);

      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(dailyGoalQueryKeys.getSuspense(), {
        dailyGoal: variables,
      });

      if (props?.onSuccess) {
        props.onSuccess(data, variables, context);
      }
    },
  });
}
