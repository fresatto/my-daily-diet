"use client";

import React from "react";
import { Utensils } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import {
  useDailyGoalSummarySuspenseQuery,
  useDailyGoalSuspenseQuery,
} from "@/services/queries/daily-goal";
import { useMealsSuspenseQuery } from "@/services/queries/meals";

export const DailyGoalCard: React.FC = () => {
  const { data: mealsData } = useMealsSuspenseQuery();
  const { data: dailyGoalData } = useDailyGoalSuspenseQuery();
  const { data: dailyGoalSummaryData } = useDailyGoalSummarySuspenseQuery();

  if (!dailyGoalData || !dailyGoalSummaryData || !mealsData) {
    return null;
  }

  const dailyGoalProtein = dailyGoalData?.dailyGoal?.protein ?? 0;

  const dailyProteinConsumed = dailyGoalSummaryData?.proteinConsumed ?? 0;

  const dailyGoalPercentage = (dailyProteinConsumed / dailyGoalProtein) * 100;

  const percentage = Number(
    dailyGoalPercentage >= 100 ? 100 : dailyGoalPercentage
  ).toFixed(1);

  const totalToAchieveGoal = Number(
    dailyGoalProtein - dailyProteinConsumed
  ).toFixed(1);

  const totalMeals = mealsData?.meals.length ?? 0;

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
