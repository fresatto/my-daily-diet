import { Skeleton } from "@/components/ui/skeleton";

export const WeekProgressLoading = () => {
  return (
    <div className="grid grid-cols-7 gap-2">
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
    </div>
  );
};
