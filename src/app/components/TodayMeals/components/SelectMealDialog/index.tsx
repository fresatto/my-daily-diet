"use client";

import { Card } from "@/components/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMealsQuery } from "@/services/queries/meals";
import { useDialog } from "@/hooks/useDialog";
import { SelectMealDialogProps } from "./types";
import { SelectMealDialogList } from "./List";

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
          <SelectMealDialogList
            meals={mealsData.meals}
            onSuccessCreateConsumedMeal={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
