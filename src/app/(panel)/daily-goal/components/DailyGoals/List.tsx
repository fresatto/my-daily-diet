"use client";

import React from "react";

import { useDailyGoalQuery } from "@/services/queries/daily-goal";
import { DailyGoalsContainer } from "./Container";
import { DailyGoalsLoading } from "./Loading";

export const DailyGoalsList: React.FC = () => {
  const { data, isFetching } = useDailyGoalQuery();

  const formattedProtein = data?.dailyGoal.protein
    ? `${data?.dailyGoal.protein}g`
    : "0";

  const formattedCarbohydrate = data?.dailyGoal.carbohydrate
    ? `${data?.dailyGoal.carbohydrate}g`
    : "0";

  const formattedFat = data?.dailyGoal.fat ? `${data?.dailyGoal.fat}g` : "0";

  const formattedCalories = data?.dailyGoal.calories
    ? `${data?.dailyGoal.calories}kcal`
    : "0";

  if (!isFetching) {
    return <DailyGoalsLoading />;
  }

  return (
    <DailyGoalsContainer>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">{formattedProtein}</strong>
        <small className="text-xs">Proteína</small>
      </div>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">{formattedCarbohydrate}</strong>
        <small className="text-xs">Carboidratos</small>
      </div>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">{formattedFat}</strong>
        <small className="text-xs">Gordura</small>
      </div>
      <div className="flex flex-col bg-gray-100 items-center justify-center p-4 rounded-lg">
        <strong className="text-xl font-bold">{formattedCalories}</strong>
        <small className="text-xs">Calorias</small>
      </div>
    </DailyGoalsContainer>
  );
};
