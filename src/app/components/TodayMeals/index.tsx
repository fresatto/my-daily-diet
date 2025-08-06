import React from "react";
import { Utensils } from "lucide-react";

import { Meal } from "@/@types/dtos";
import { Button } from "@/components/ui/button";
import { NewMealDialog } from "@/components/NewMealDialog";

type FormattedMeal = Meal & {
  formattedTime: string;
};

type TodayMealsProps = {
  meals?: FormattedMeal[];
};

export const TodayMeals: React.FC<TodayMealsProps> = ({ meals }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <Utensils size={16} />
        <h3 className="text-sm font-bold">Refeições de hoje</h3>
      </div>

      {meals?.length === 0 && (
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            Nenhuma refeição cadastrada. Clique no botão abaixo para cadastrar.
          </p>
        </div>
      )}
      {meals?.map((meal) => (
        <div
          key={meal.id}
          className="flex py-3 px-4 justify-between items-center rounded-lg bg-gray-100"
        >
          <div className="flex flex-col">
            <h3 className="text-sm font-bold">{meal.food.name}</h3>
            <small>{meal.formattedTime}</small>
          </div>
          <div className="flex flex-col items-end text-xs">
            <p className="font-bold">{meal.proteinConsumed}g</p>
            <p>proteína</p>
          </div>
        </div>
      ))}

      <NewMealDialog>
        <Button>Nova refeição</Button>
      </NewMealDialog>
    </div>
  );
};
