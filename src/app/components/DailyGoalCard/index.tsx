import React from "react";
import { Utensils } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type DailyGoalCardProps = {
  dailyProteinConsumed: number;
  dailyGoalProtein: number;
  dailyGoalPercentage: number;
};

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  dailyProteinConsumed,
  dailyGoalProtein,
  dailyGoalPercentage,
}) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Proteínas consumidas</h3>
        <Utensils />
      </div>
      <div className="flex flex-col">
        <strong data-testid="daily-protein-consumed">
          {dailyProteinConsumed}g
        </strong>
        <small>de {dailyGoalProtein}g meta diária</small>
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={Number(dailyGoalPercentage)} />
        <small className="text-sm text-gray-500">
          {dailyGoalPercentage}% do objetivo diário
        </small>
      </div>
    </div>
  );
};
