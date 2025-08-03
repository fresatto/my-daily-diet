import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import {
  DailyGoalResponse,
  DailyGoalSummaryResponse,
  Period,
} from "@/@types/dtos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMealsQuery } from "@/services/queries/meals";

export function useDashboardController() {
  const { data } = useQuery({
    queryKey: ["daily-goal"],
    queryFn: async () => {
      const response = await api.get<DailyGoalResponse>("/daily-goal");

      return response.data;
    },
  });

  const { data: summary } = useQuery({
    queryKey: ["daily-goal-summary"],
    queryFn: async () => {
      const response = await api.get<DailyGoalSummaryResponse>(
        "/daily-goal/summary"
      );

      return response.data;
    },
  });

  const { data: mealsData } = useMealsQuery({
    period: Period.TODAY,
  });

  const getTodayFormattedDate = () => {
    const formattedDate = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });

    const capitalizedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return capitalizedDate;
  };

  const todayFormattedDate = getTodayFormattedDate();

  const dailyGoalProtein = data?.dailyGoal?.protein ?? 0;
  const dailyProteinConsumed = summary?.proteinConsumed ?? 0;

  const dailyGoalPercentage = Number(
    (dailyProteinConsumed / dailyGoalProtein) * 100
  ).toFixed(0);

  return {
    todayFormattedDate,
    dailyGoalProtein,
    dailyGoalPercentage,
    dailyProteinConsumed,
    mealsData,
  };
}
