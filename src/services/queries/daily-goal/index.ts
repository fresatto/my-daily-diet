import { DailyGoalResponse, DailyGoalSummaryResponse } from "@/@types/dtos";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const dailyGoalQueryKeys = {
  all: () => ["dailyGoal"],
  get: () => [...dailyGoalQueryKeys.all(), "get"],
  getSummary: () => [...dailyGoalQueryKeys.all(), "getSummary"],
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
