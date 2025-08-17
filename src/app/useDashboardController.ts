import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useDashboardController() {
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
  };
}
