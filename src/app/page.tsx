import { DailyGoalCard } from "./components/DailyGoalCard";
import { TodayMeals } from "./components/TodayMeals";
import { WeekProgress } from "./components/WeekProgress";
import { DashboardHeader } from "./components/DashboardHeader";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader />
      <DailyGoalCard />
      <TodayMeals />
      <WeekProgress />
    </div>
  );
}
