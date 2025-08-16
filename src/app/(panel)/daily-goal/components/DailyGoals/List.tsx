"use client";

import React from "react";

import { useDailyGoalSuspenseQuery } from "@/services/queries/daily-goal";
import { DailyGoalsContainer } from "./Container";

export const DailyGoalsList: React.FC = () => {
  const { data } = useDailyGoalSuspenseQuery();

  if (!data.dailyGoal) {
    return null;
  }

  const { protein, carbohydrate, fat, calories } = data.dailyGoal;

  const formattedProtein = protein ? `${protein}g` : "0";
  const formattedCarbohydrate = carbohydrate ? `${carbohydrate}g` : "0";
  const formattedFat = fat ? `${fat}g` : "0";
  const formattedCalories = calories ? `${calories}kcal` : "0";

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
