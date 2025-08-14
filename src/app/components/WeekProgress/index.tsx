import React from "react";
import { TrendingUp } from "lucide-react";
import { WeekProgress as WeekProgressType } from "@/@types/week-progress";
import { Skeleton } from "@/components/ui/skeleton";

type WeekProgressProps = {
  weekProgress?: WeekProgressType;
  isLoading?: boolean;
};

export const WeekProgress: React.FC<WeekProgressProps> = ({
  weekProgress,
  isLoading,
}) => {
  const getFormattedWeekDays = () => {
    if (!weekProgress) return [];

    const days = Object.keys(weekProgress).map((day) => {
      const dailyGoalPercentage =
        weekProgress[day]?.dailyGoalPercentage >= 100
          ? 100
          : weekProgress[day]?.dailyGoalPercentage;

      return {
        day: day,
        proteinsConsumed: weekProgress[day]?.total.toFixed(2),
        dailyGoalPercentage,
      };
    });

    return days;
  };

  const days = getFormattedWeekDays();

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <TrendingUp size={16} />
        <h3 className="text-sm font-bold">Progresso da semana</h3>
      </div>

      {isLoading ? (
        <Skeleton className="h-20 w-full" />
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {days.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-500">{item.day}</span>
              <div className="bg-gray-200 rounded-lg h-20 w-full relative p-[3px] flex flex-col justify-end">
                <div
                  className="bg-primary rounded-lg"
                  style={{
                    height: `${item.dailyGoalPercentage}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-500">
                {item.proteinsConsumed}g
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
