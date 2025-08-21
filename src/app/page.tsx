"use client";

import { Suspense } from "react";
import { Calendar } from "lucide-react";

import { useDashboardController } from "./useDashboardController";
import { DailyGoalCard } from "./components/DailyGoalCard";
import { TodayMeals } from "./components/TodayMeals";
import { WeekProgress } from "./components/WeekProgress";
import HomeLoading from "./loading";

export default function Dashboard() {
  const { todayFormattedDate } = useDashboardController();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <h1 className="text-sm">{todayFormattedDate}</h1>
      </div>

      <Suspense fallback={<HomeLoading />}>
        <DailyGoalCard />
        <TodayMeals />
        <WeekProgress />
      </Suspense>
    </div>
  );
}
