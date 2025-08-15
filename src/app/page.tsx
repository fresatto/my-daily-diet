"use client";

import { Calendar } from "lucide-react";

import { useDashboardController } from "./useDashboardController";
import { DailyGoalCard } from "./components/DailyGoalCard";
import { TodayMeals } from "./components/TodayMeals";
import { WeekProgress } from "./components/WeekProgress";

export default function Dashboard() {
  const {
    mealsData,
    todayFormattedDate,
    dailyGoalProtein,
    dailyGoalPercentage,
    dailyProteinConsumed,
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
      <DailyGoalCard
        dailyProteinConsumed={dailyProteinConsumed}
        dailyGoalProtein={dailyGoalProtein}
        dailyGoalPercentage={Number(dailyGoalPercentage)}
        totalMeals={totalMeals}
      />
      <TodayMeals meals={mealsData?.meals} isLoading={isFetchingMeals} />
      <WeekProgress
        weekProgress={weekProgressData?.weekProgress}
        isLoading={isFetchingWeekProgress}
      />
    </div>
  );
}
