import React from "react";

import { Skeleton } from "../ui/skeleton";

export const ListLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-[74px] w-full" />
      <Skeleton className="h-[74px] w-full" />
    </div>
  );
};
