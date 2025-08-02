import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import {
  DailyGoalResponse,
  DailyGoalSummaryResponse,
  MealsResponse,
} from "@/@types/dtos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { parseDateToLocalUTC } from "@/lib/date";

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

  const { data: mealsData } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals");

      const meals = response.data.meals.map((meal) => {
        const localDate = parseDateToLocalUTC(meal.created_at);

        return {
          ...meal,
          created_at: format(localDate, "'às' HH:mm"),
        };
      });

      return {
        meals,
      };
    },
  });

  const getTodayFormattedDate = () => {
    const formattedDate = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });

    const capitalizedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    console.log({ capitalizedDate });

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
