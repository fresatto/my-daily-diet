"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "lucide-react";

export function DashboardHeader() {
  const getTodayFormattedDate = () => {
    const formattedDate = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });

    const capitalizedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return capitalizedDate;
  };

  const todayFormattedDate = getTodayFormattedDate();

  return (
    <div className="flex items-center gap-2">
      <Calendar size={16} />
      <h1 className="text-sm">{todayFormattedDate}</h1>
    </div>
  );
}
