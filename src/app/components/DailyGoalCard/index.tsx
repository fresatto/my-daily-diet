import React from "react";
import { Utensils } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type DailyGoalCardProps = {
  dailyProteinConsumed: number;
  dailyGoalProtein: number;
  dailyGoalPercentage: number;
  totalMeals: number;
};

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  dailyProteinConsumed,
  dailyGoalProtein,
  dailyGoalPercentage,
  totalMeals,
}) => {
  const percentage = dailyGoalPercentage >= 100 ? 100 : dailyGoalPercentage;
  const totalToAchieveGoal = Number(
    dailyGoalProtein - dailyProteinConsumed
  ).toFixed(1);

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Resumo</h3>
        <Utensils />
      </div>
      <div className="flex flex-col">
        <small data-testid="daily-goal-protein">Total de proteínas</small>
        <strong data-testid="daily-protein-consumed">
          {dailyProteinConsumed}g
        </strong>
      </div>
      <div className="flex flex-col">
        <small data-testid="daily-goal-protein">
          Quantidade necessária para atingir a meta
        </small>
        <strong data-testid="daily-protein-consumed">
          {totalToAchieveGoal}g
        </strong>
      </div>
      <div className="flex flex-col">
        <small data-testid="daily-goal-protein">Total de refeições</small>
        <strong data-testid="daily-protein-consumed">{totalMeals}</strong>
      </div>
      <div className="flex flex-col gap-2">
        <small data-testid="daily-goal-protein">Porcentagem</small>
        <Progress value={Number(percentage)} />
        <small className="text-sm text-gray-500">
          {percentage}% do objetivo diário
        </small>
      </div>
    </div>
  );
};
