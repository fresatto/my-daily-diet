import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

export function useDailyGoalMutation() {
  return useMutation({
    mutationKey: dailyGoalQueryKeys.update(),
    mutationFn: async (data: DailyGoalRequest) => {
      const response = await api.post("/daily-goal", data);

      return response.data;
    },
  });
}
