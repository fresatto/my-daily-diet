"use client";

import React from "react";

import { FormattedMeal } from "@/@types/meal";

type MealsListProps = {
  meals: FormattedMeal[];
  renderMeal: (meal: FormattedMeal) => React.ReactNode;
};

export const MealsList: React.FC<MealsListProps> = ({ meals, renderMeal }) => {
  return (
    <div className="flex flex-col gap-2">
      {meals.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">
            Nenhuma refeição cadastrada.
          </p>
        </div>
      )}

      {meals.map((meal) => renderMeal(meal))}
    </div>
  );
};
