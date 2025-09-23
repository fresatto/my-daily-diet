"use client";

import { PageHeader } from "@/components/PageHeader";
import { MealsList } from "./components/MealsList";
import { useDeleteMealMutation, useMealsQuery } from "@/services/queries/meals";
import { MealListItem } from "./components/MealListItem";
import { MealListItemAction } from "./components/MealListItemAction";
import { toast } from "sonner";

export default function Meals() {
  const { data } = useMealsQuery();
  const {
    mutate: deleteMeal,
    isPending,
    variables: mealId,
  } = useDeleteMealMutation({
    onSuccess: () => {
      toast.success("Refeição deletada com sucesso!");
    },
  });
  return (
    <div>
      <PageHeader title="Refeições cadastradas" />

      {data && (
        <MealsList
          meals={data.meals}
          renderMeal={(meal) => (
            <MealListItem
              meal={meal}
              action={
                <MealListItemAction
                  onConfirmDeleteMeal={() => deleteMeal(meal.id)}
                  loading={isPending && mealId === meal.id}
                />
              }
            />
          )}
        />
      )}
    </div>
  );
}
