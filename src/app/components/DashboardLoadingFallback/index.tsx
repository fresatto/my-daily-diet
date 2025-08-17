import React from "react";
import { TrendingUp, Utensils } from "lucide-react";

import { Card } from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardLoadingFallback: React.FC = () => {
  return (
    <>
      <Card.Container>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Resumo</h3>
          <Utensils />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Card.Container>
      <Card.Container>
        <div className="flex items-center gap-2">
          <Utensils size={16} />
          <h3 className="text-sm font-bold">Refeições de hoje</h3>
        </div>
        <Skeleton className="h-15 w-full" />
        <Skeleton className="h-15 w-full" />
      </Card.Container>
      <Card.Container>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} />
          <h3 className="text-sm font-bold">Progresso da semana</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
        </div>
      </Card.Container>
    </>
  );
};
