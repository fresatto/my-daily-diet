import React from "react";
import { toast } from "sonner";

import { SelectMealDialogMealsListProps } from "./types";
import { useConsumedMealsMutation } from "@/services/queries/consumed-meals";
import { MealList } from "@/components/MealList";
import { MealItemList } from "@/components/MealItemList";

export const SelectMealDialogList = ({
  meals,
  onSuccessCreateConsumedMeal,
}: SelectMealDialogMealsListProps) => {
  const {
    mutate: createConsumedMeal,
    variables,
    isPending,
  } = useConsumedMealsMutation({
    onSuccess: onSuccessCreateConsumedMeal,
    onError: () => toast.error("Erro ao registrar."),
  });

  return (
    <>
      <p className="text-sm text-gray-500">
        Selecione uma das <strong>refeições salvas</strong> para registrar o
        consumo.
      </p>

      <div className="max-h-[400px] overflow-y-auto hide-scrollbar">
        <MealList.List
          meals={meals}
          renderMeal={(meal) => {
            const isLoading = variables?.meal_id === meal.id && isPending;

            return (
              <button
                key={meal.id}
                className="cursor-pointer  hover:brightness-90 transition-all"
                onClick={() => createConsumedMeal({ meal_id: meal.id })}
              >
                <MealItemList meal={meal} isLoading={isLoading} />
              </button>
            );
          }}
        />
      </div>
    </>
  );
};
