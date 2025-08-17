import React, { useState } from "react";
import { Calendar, TrashIcon } from "lucide-react";

import { CardListItem } from "@/components/CardListItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteMealMutation,
  useMealsSuspenseQuery,
} from "@/services/queries/meals";
import { toast } from "sonner";

export const MealsList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string>();

  const { data } = useMealsSuspenseQuery();
  const { mutate: deleteMeal, isPending } = useDeleteMealMutation({
    onSuccess: () => {
      toast.success("Refeição deletada com sucesso!");
      setSelectedMealId(undefined);
    },
  });

  const handleOpenConfirmMealDeletionModal = (
    isOpen: boolean,
    mealId: string
  ) => {
    setSelectedMealId(mealId);
    setOpen(isOpen);
  };

  const handleDeleteMeal = (mealId: string) => {
    deleteMeal(mealId);
    setOpen(false);
  };

  if (!data) {
    return null;
  }

  const { meals } = data;

  return (
    <div className="flex flex-col gap-2">
      {data?.meals.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">
            Nenhuma refeição cadastrada.
          </p>
        </div>
      )}

      {meals.map((meal) => (
        <CardListItem.Container key={meal.id}>
          <CardListItem.Content>
            <CardListItem.Header>
              <h3 className="text-md font-bold">{meal.food.name}</h3>
              <CardListItem.Badge>
                {meal.amount}
                {meal.food.portion_type === "grams" ? "g" : " unidade"}
              </CardListItem.Badge>
              <CardListItem.Badge>
                {meal.proteinConsumed}g proteínas
              </CardListItem.Badge>
            </CardListItem.Header>
            <CardListItem.Specs className="flex gap-2">
              <CardListItem.Spec>
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{meal.created_at}</span>
              </CardListItem.Spec>
            </CardListItem.Specs>
          </CardListItem.Content>
          <aside>
            <Dialog
              open={selectedMealId === meal.id && open}
              onOpenChange={(isOpen) =>
                handleOpenConfirmMealDeletionModal(isOpen, meal.id)
              }
            >
              <DialogTrigger className="w-4 h-4" asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  loading={selectedMealId === meal.id && isPending}
                >
                  <TrashIcon className="w-1 h-1" color="red" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tem certeza?</DialogTitle>
                  <DialogDescription>
                    Essa ação não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteMeal(meal.id)}
                  >
                    Deletar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </aside>
        </CardListItem.Container>
      ))}
    </div>
  );
};
