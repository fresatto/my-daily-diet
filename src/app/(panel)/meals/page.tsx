"use client";

import { useState } from "react";
import { Calendar, PlusIcon, TrashIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Period } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { NewMealDialog } from "@/components/NewMealDialog";
import { useDeleteMealMutation, useMealsQuery } from "@/services/queries/meals";
import { CardListItem } from "@/components/CardListItem";

export default function Meals() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(
    Period.TODAY
  );

  const [selectedMealId, setSelectedMealId] = useState<string>();
  const [isDeleteMealDialogOpen, setIsDeleteMealDialogOpen] = useState(false);

  const handleDeleteMealDialogOpenChange = (open: boolean, mealId?: string) => {
    setIsDeleteMealDialogOpen(open);
    setSelectedMealId(mealId);
  };

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
  };

  const { data } = useMealsQuery({
    period: selectedPeriod,
  });

  const { mutate: deleteMeal } = useDeleteMealMutation({
    onSuccess: () => {
      toast.success("Refeição deletada com sucesso!");
      handleDeleteMealDialogOpenChange(false);
    },
  });

  return (
    <div>
      <PageHeader
        title="Refeições cadastradas"
        action={
          <div className="flex gap-2">
            <Select
              defaultValue={Period.TODAY}
              onValueChange={(value: Period) => handlePeriodChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Period.TODAY}>Hoje</SelectItem>
                <SelectItem value={Period.YESTERDAY}>Ontem</SelectItem>
                <SelectItem value={Period.LAST_7_DAYS}>
                  Últimos 7 dias
                </SelectItem>
                <SelectItem value={Period.MONTH}>Mês</SelectItem>
              </SelectContent>
            </Select>
            <NewMealDialog>
              <Button>
                <PlusIcon className="w-4 h-4" />
                Cadastrar refeição
              </Button>
            </NewMealDialog>
          </div>
        }
      />
      <div className="flex flex-col gap-2">
        {data?.meals.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              Nenhuma refeição cadastrada.
            </p>
          </div>
        )}

        {data?.meals.map((meal) => (
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
                open={selectedMealId === meal.id && isDeleteMealDialogOpen}
                onOpenChange={(open) =>
                  handleDeleteMealDialogOpenChange(open, meal.id)
                }
              >
                <DialogTrigger className="w-4 h-4" asChild>
                  <Button variant="ghost" size="icon">
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
                      onClick={() => deleteMeal(meal.id)}
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
    </div>
  );
}
