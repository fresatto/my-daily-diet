import { WeekProgressResponse } from "@/@types/week-progress";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const weekProgressQueryKeys = {
  all: () => ["week-progress"],
  list: () => [...weekProgressQueryKeys.all(), "list"],
};

export const useWeekProgressQuery = () => {
  return useQuery({
    queryKey: weekProgressQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get<WeekProgressResponse>("/week-progress");

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
