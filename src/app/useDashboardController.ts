import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Period } from "@/@types/dtos";
import { useMealsQuery } from "@/services/queries/meals";
import { useWeekProgressQuery } from "@/services/queries/week-progress";
import {
  useDailyGoalQuery,
  useDailyGoalSummaryQuery,
} from "@/services/queries/daily-goal";

export function useDashboardController() {
  const { data } = useDailyGoalQuery();
  const { data: summary } = useDailyGoalSummaryQuery();

  const { data: mealsData, isFetching: isFetchingMeals } = useMealsQuery({
    period: Period.TODAY,
  });

  const { data: weekProgressData, isFetching: isFetchingWeekProgress } =
    useWeekProgressQuery();

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
    data,
    todayFormattedDate,
    dailyGoalProtein,
    dailyGoalPercentage,
    dailyProteinConsumed,
    mealsData,
    isFetchingMeals,
    weekProgressData,
    isFetchingWeekProgress,
  };
}
