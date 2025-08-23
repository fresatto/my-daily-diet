import { Skeleton } from "@/components/ui/skeleton";

export const TodayMealsLoading = () => {
  return (
    <>
      <Skeleton className="h-15 w-full" />
      <Skeleton className="h-15 w-full" />
    </>
  );
};
