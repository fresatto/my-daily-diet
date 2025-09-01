"use client";
import { toast } from "sonner";

import { Card } from "@/components/Card";
import { MealItemList } from "@/components/MealItemList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useConsumedMealsMutation } from "@/services/queries/consumed-meals";
import { useMealsQuery } from "@/services/queries/meals";
import { useDialog } from "@/hooks/useDialog";
import { MealList } from "@/components/MealList";
import { SelectMealDialogMealsListProps, SelectMealDialogProps } from "./types";

export const SelectMealDialog = ({ children }: SelectMealDialogProps) => {
  const { data: mealsData, error } = useMealsQuery();

  const { open, handleOpenChange } = useDialog();

  const isEmpty = !mealsData?.meals || mealsData?.meals.length === 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma refeição</DialogTitle>
        </DialogHeader>
        {error && <Card.Error title="Erro ao carregar refeições." />}
        {isEmpty && (
          <p className="text-sm text-gray-500">
            Nenhuma refeição salva. Cadastre uma refeição para selecionar.
          </p>
        )}
        {!error && !isEmpty && (
          <SelectMealDialogMealsList
            meals={mealsData.meals}
            onSuccessCreateConsumedMeal={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

function SelectMealDialogMealsList({
  meals,
  onSuccessCreateConsumedMeal,
}: SelectMealDialogMealsListProps) {
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
}
