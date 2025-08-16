"use client";

import { Suspense } from "react";
import { Calendar } from "lucide-react";

import { useDashboardController } from "./useDashboardController";
import { DailyGoalCard } from "./components/DailyGoalCard";
import { TodayMeals } from "./components/TodayMeals";
import { WeekProgress } from "./components/WeekProgress";
import { DashboardLoadingFallback } from "./components/DashboardLoadingFallback";

export default function Dashboard() {
  const {
    mealsData,
    todayFormattedDate,
    dailyGoalPercentage,
    isFetchingMeals,
    weekProgressData,
    isFetchingWeekProgress,
  } = useDashboardController();

  const totalMeals = mealsData?.meals.length ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <h1 className="text-sm">{todayFormattedDate}</h1>
      </div>

      <Suspense fallback={<DashboardLoadingFallback />}>
        <DailyGoalCard
          dailyGoalPercentage={Number(dailyGoalPercentage)}
          totalMeals={totalMeals}
        />
        <TodayMeals meals={mealsData?.meals} isLoading={isFetchingMeals} />
        <WeekProgress
          weekProgress={weekProgressData?.weekProgress}
          isLoading={isFetchingWeekProgress}
        />
      </Suspense>
    </div>
  );
}
