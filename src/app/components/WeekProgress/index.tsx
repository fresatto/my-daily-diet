import React from "react";
import { TrendingUp } from "lucide-react";
import { WeekProgressDaysEnum } from "@/@types/week-progress";
import { useWeekProgressSuspenseQuery } from "@/services/queries/week-progress";

const parsedDays: Record<WeekProgressDaysEnum, string> = {
  [WeekProgressDaysEnum.SUNDAY]: "Dom.",
  [WeekProgressDaysEnum.MONDAY]: "Seg.",
  [WeekProgressDaysEnum.TUESDAY]: "Ter.",
  [WeekProgressDaysEnum.WEDNESDAY]: "Qua.",
  [WeekProgressDaysEnum.THURSDAY]: "Qui.",
  [WeekProgressDaysEnum.FRIDAY]: "Sex.",
  [WeekProgressDaysEnum.SATURDAY]: "Sáb.",
};

export const WeekProgress: React.FC = () => {
  const { data } = useWeekProgressSuspenseQuery();

  if (!data) {
    return null;
  }

  const { weekProgress } = data;

  const getFormattedWeekDays = () => {
    if (!weekProgress) return [];

    const weekDaysNameArray = Object.keys(
      weekProgress
    ) as unknown as WeekProgressDaysEnum[];

    const days = weekDaysNameArray.map((day) => {
      const weekDay = weekProgress[day];

      const dailyGoalPercentage =
        weekDay.dailyGoalPercentage >= 100 ? 100 : weekDay.dailyGoalPercentage;

      return {
        day: day,
        weekDay: parsedDays[day],
        proteinsConsumed: weekDay.total.toFixed(2),
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

      <div className="grid grid-cols-7 gap-2">
        {days.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-500">{item.weekDay}</span>
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
    </div>
  );
};
