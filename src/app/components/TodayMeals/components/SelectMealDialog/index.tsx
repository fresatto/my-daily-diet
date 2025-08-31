"use client";

import { Loader2 } from "lucide-react";
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

type SelectMealDialogProps = {
  children: React.ReactNode;
};

export const SelectMealDialog = ({ children }: SelectMealDialogProps) => {
  const { data, error } = useMealsQuery();
  const {
    mutate: createConsumedMeal,
    variables,
    isPending,
  } = useConsumedMealsMutation();

  const isEmpty = data?.meals.length === 0;

  const handleSelectMeal = (mealId: string) => {
    createConsumedMeal({ meal_id: mealId });
  };

  const renderContent = () => {
    if (error) {
      return <Card.Error title="Erro ao carregar refeições." />;
    }

    if (isEmpty) {
      return (
        <p className="text-sm text-gray-500">
          Nenhuma refeição salva. Cadastre uma refeição para selecionar.
        </p>
      );
    }

    return (
      <>
        <p className="text-sm text-gray-500">
          Selecione uma das <strong>refeições salvas</strong> para registrar o
          consumo.
        </p>

        <div className="max-h-[400px] overflow-y-auto flex flex-col gap-2 hide-scrollbar">
          {data?.meals.map((meal) => {
            const isLoading = variables?.meal_id === meal.id && isPending;

            return (
              <button
                key={meal.id}
                className="cursor-pointer  hover:brightness-90 transition-all"
                onClick={() => handleSelectMeal(meal.id)}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <MealItemList meal={meal} />
                )}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma refeição</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
