import React from "react";

import { DailyGoalsContainer } from "./Container";
import { Skeleton } from "@/components/ui/skeleton";

export const DailyGoalsLoading: React.FC = () => {
  return (
    <DailyGoalsContainer>
      <Skeleton className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg h-[76px]" />
      <Skeleton className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg h-[76px]" />
      <Skeleton className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg h-[76px]" />
      <Skeleton className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg h-[76px]" />
    </DailyGoalsContainer>
  );
};
