"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Meal, MealsResponse, Period } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/services/api";
import { parseDateToLocalUTC } from "@/lib/date";
import { toast } from "sonner";
import { NewMealDialog } from "@/components/NewMealDialog";

export default function Meals() {
  const queryClient = useQueryClient();
  const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(
    Period.TODAY
  );

  const getMealAmountSuffix = (meal: Meal) => {
    if (meal.food.portion_type === "grams") {
      return "g";
    }

    return meal.amount > 0 ? "unidades" : "unidades";
  };

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
  };

  const { data } = useQuery({
    queryKey: ["meals", selectedPeriod],
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals", {
        params: {
          period: selectedPeriod,
        },
      });

      const meals = response.data.meals.map((meal) => {
        const localDate = parseDateToLocalUTC(meal.created_at);
        const amountSuffix = getMealAmountSuffix(meal);
        const formattedAmount = `${meal.amount}${amountSuffix}`;

        return {
          ...meal,
          formattedAmount,
          created_at: format(localDate, "dd/MM/yyyy HH:mm"),
        };
      });

      return {
        meals,
      };
    },
  });

  const { mutate: deleteMeal } = useMutation({
    mutationFn: async (mealId: string) => {
      await api.delete(`/meals/${mealId}`);

      return mealId;
    },
    onSuccess: (mealId) => {
      queryClient.setQueryData(["meals", selectedPeriod], {
        meals: data?.meals.filter((meal) => meal.id !== mealId),
      });

      toast.success("Refeição deletada com sucesso!");
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
      <Table>
        {data?.meals.length === 0 && (
          <TableCaption>Nenhuma refeição cadastrada.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo de porção</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Proteína consumida</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.food.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {meal.food.portion_type === "grams" ? "Gramas" : "Unidade"}
                </Badge>
              </TableCell>
              <TableCell>{meal.formattedAmount}</TableCell>
              <TableCell>{meal.proteinConsumed}g</TableCell>
              <TableCell>{meal.created_at}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <PencilIcon className="w-1 h-1" />
                </Button>

                <Dialog>
                  <DialogTrigger>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
