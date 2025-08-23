import { WeekProgressResponse } from "@/@types/week-progress";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const weekProgressQueryKeys = {
  all: () => ["week-progress"],
  list: () => [...weekProgressQueryKeys.all(), "list"],
  listSuspense: () => [...weekProgressQueryKeys.all(), "listSuspense"],
};

export const useWeekProgressQuery = () => {
  return useQuery({
    queryKey: weekProgressQueryKeys.list(),
    queryFn: async () => {
      try {
        const response = await api.get<WeekProgressResponse>("/week-progress");

        return response.data;
      } catch (error) {
        toast.error("Erro ao carregar o progresso da semana");
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
