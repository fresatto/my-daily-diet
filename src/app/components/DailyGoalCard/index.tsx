"use client";

import React from "react";
import { Utensils } from "lucide-react";

import { Card } from "@/components/Card";
import { Progress } from "@/components/ui/progress";
import {
  useDailyGoalQuery,
  useDailyGoalSummaryQuery,
} from "@/services/queries/daily-goal";
import { useMealsQuery } from "@/services/queries/meals";
import { DailyGoalCardLoading } from "./components/Loading";

export const DailyGoalCard: React.FC = () => {
  const { data: mealsData, ...mealsQuery } = useMealsQuery();
  const { data: dailyGoalData, ...dailyGoalQuery } = useDailyGoalQuery();
  const { data: dailyGoalSummaryData, ...dailyGoalSummaryQuery } =
    useDailyGoalSummaryQuery();

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

  const failedToFetchData =
    mealsQuery.error || dailyGoalQuery.error || dailyGoalSummaryQuery.error;

  const loading =
    mealsQuery.isFetching ||
    dailyGoalQuery.isFetching ||
    dailyGoalSummaryQuery.isFetching;

  const renderContent = () => {
    if (failedToFetchData) {
      return <Card.Error title="Erro ao carregar o resumo." />;
    }

    if (loading) {
      return <DailyGoalCardLoading />;
    }

    return (
      <>
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
      </>
    );
  };

  return (
    <Card.Container>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Resumo</h3>
        <Utensils />
      </div>

      {renderContent()}
    </Card.Container>
  );
};
