"use client";

import { Card } from "@/components/Card";
import { MealItemList } from "@/components/MealItemList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMealsQuery } from "@/services/queries/meals";

type SelectMealDialogProps = {
  children: React.ReactNode;
};

export const SelectMealDialog = ({ children }: SelectMealDialogProps) => {
  const { data, error } = useMealsQuery();

  const isEmpty = data?.meals.length === 0;

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
            return (
              <button
                key={meal.id}
                className="cursor-pointer  hover:brightness-90 transition-all"
              >
                <MealItemList key={meal.id} meal={meal} />
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
