import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns-tz";

import { getTimeZone, parseDateToLocalUTC } from "@/lib/date";
import { api } from "@/services/api";
import { MealsResponse } from "@/@types/meal";

export const consumedMealsQueryKeys = {
  base: () => ["consumed-meals"],
  list: () => [...consumedMealsQueryKeys.base(), "list"],
};

export const useConsumedMealsQuery = () => {
  const startDate = format(new Date(), "yyyy-MM-dd");
  const timezone = getTimeZone();

  return useQuery({
    queryKey: consumedMealsQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/consumed-meals", {
        params: {
          startDate,
          timezone,
        },
      });

      return response.data;
    },
    select: (data) => {
      try {
        const meals = data.meals.map((meal) => {
          const localDate = parseDateToLocalUTC(meal.created_at);
          const amountSuffix = "g";
          const formattedAmount = `${100}${amountSuffix}`;
          const formattedTime = format(localDate, "'às' HH:mm");

          return {
            ...meal,
            meal: meal.name,
            formattedAmount,
            formattedTime,
            created_at: format(localDate, "dd/MM/yyyy HH:mm"),
          };
        });

        return {
          meals,
        };
      } catch {
        throw new Error("Erro ao formatar as refeições.");
      }
    },
  });
};
