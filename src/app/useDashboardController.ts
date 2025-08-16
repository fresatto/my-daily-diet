import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useWeekProgressQuery } from "@/services/queries/week-progress";

export function useDashboardController() {
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

  return {
    todayFormattedDate,
    weekProgressData,
    isFetchingWeekProgress,
  };
}
