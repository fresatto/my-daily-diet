import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { WeekProgressResponse } from "@/@types/week-progress";
import { getTimeZone } from "@/lib/date";
import { api } from "@/services/api";

export const weekProgressQueryKeys = {
  all: () => ["week-progress"],
  list: () => [...weekProgressQueryKeys.all(), "list"],
};

export const useWeekProgressQuery = () => {
  const startDate = format(new Date(), "yyyy-MM-dd");
  const timezone = getTimeZone();

  return useQuery({
    queryKey: weekProgressQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get<WeekProgressResponse>("/week-progress", {
        params: {
          startDate,
          timezone,
        },
      });

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
