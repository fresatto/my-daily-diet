import React from "react";
import { TrendingUp } from "lucide-react";

export const WeekProgress: React.FC = () => {
  const mockedWeekProgress = [
    {
      day: "Dom",
      progress: 50,
    },
    {
      day: "Seg",
      progress: 20,
    },
    {
      day: "Ter",
      progress: 0,
    },
    {
      day: "Qua",
      progress: 33,
    },
    {
      day: "Qui",
      progress: 44,
    },
    {
      day: "Sex",
      progress: 90,
    },
    {
      day: "Sáb",
      progress: 80,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <TrendingUp size={16} />
        <h3 className="text-sm font-bold">Progresso da semana</h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {mockedWeekProgress.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-500">{item.day}</span>
            <div className="bg-gray-200 rounded-lg h-20 w-full relative p-[3px]">
              <div
                className="bg-primary rounded-lg absolute bottom-[3px] left-[3px] right-[3px]"
                style={{ height: `${item.progress}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500">{item.progress}g</span>
          </div>
        ))}
      </div>
    </div>
  );
};
