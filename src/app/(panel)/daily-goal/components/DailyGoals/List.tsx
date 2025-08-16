import { useDailyGoalSuspenseQuery } from "@/services/queries/daily-goal";
import React from "react";
import { DailyGoalsContainer } from "./Container";

export const DailyGoalsList: React.FC = () => {
  const { data } = useDailyGoalSuspenseQuery();

  return (
    <DailyGoalsContainer>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">{data.dailyGoal.protein}g</strong>
        <small className="text-xs">Proteína</small>
      </div>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">150g</strong>
        <small className="text-xs">Carboidratos</small>
      </div>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">70g</strong>
        <small className="text-xs">Gordura</small>
      </div>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">2000</strong>
        <small className="text-xs">Calorias</small>
      </div>
    </DailyGoalsContainer>
  );
};
