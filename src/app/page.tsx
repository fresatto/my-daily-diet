import { Suspense } from "react";

// import { DailyGoalCard } from "./components/DailyGoalCard";
import { TodayMeals } from "./components/TodayMeals";
// import { WeekProgress } from "./components/WeekProgress";
import HomeLoading from "./loading";
import { DashboardHeader } from "./components/DashboardHeader";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader />
      {/* <Suspense fallback={<HomeLoading />}> */}
      {/* <DailyGoalCard /> */}
      <TodayMeals />
      {/* <WeekProgress /> */}
      {/* </Suspense> */}
    </div>
  );
}
