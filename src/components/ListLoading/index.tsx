import React from "react";

import { Skeleton } from "../ui/skeleton";

// import { Container } from './styles';

export const ListLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
