"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { BicepsFlexed, PlusIcon, Scale, TrashIcon } from "lucide-react";
import { FoodsResponse } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NewFoodDialog } from "@/components/NewFoodDialog";
import { foodsQueryKeys } from "@/services/queries/foods";
import { CardListItem } from "@/components/CardListItem";

export default function Foods() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: foodsQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get<FoodsResponse>("/food");

      return response.data;
    },
  });

  const { mutate: deleteFood } = useMutation({
    mutationFn: async (foodId: string) => {
      await api.delete(`/food/${foodId}`);

      return foodId;
    },
    onSuccess: (foodId) => {
      const foods = queryClient.getQueryData<FoodsResponse>(["foods"]);

      toast.success("Alimento deletado com sucesso");

      if (foods) {
        queryClient.setQueryData(["foods"], {
          foods: foods.foods.filter((food) => food.id !== foodId),
        });
      }
    },
  });

  return (
    <div>
      <PageHeader
        title="Alimentos cadastrados"
        action={
          <NewFoodDialog>
            <Button>
              <PlusIcon />
              Adicionar
            </Button>
          </NewFoodDialog>
        }
      />

      <div className="flex flex-col gap-2">
        {data?.foods.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              Nenhum alimento cadastrado.
            </p>
          </div>
        )}

        {data?.foods.map((food) => (
          <CardListItem.Container key={food.id}>
            <CardListItem.Content>
              <CardListItem.Header>
                <h3 className="text-md font-bold">{food.name}</h3>
                <CardListItem.Badge>
                  {food.portion_type === "grams" ? "Gramas" : "Unidade"}
                </CardListItem.Badge>
              </CardListItem.Header>
              <CardListItem.Specs>
                <CardListItem.Spec>
                  <Scale className="w-3 h-3" />
                  <span className="text-xs">
                    {food.portion_amount}
                    {food.portion_type === "grams" ? "g" : " unidade"}
                  </span>
                </CardListItem.Spec>
                <CardListItem.Spec>
                  <BicepsFlexed className="w-3 h-3" />
                  <span className="text-xs">{food.protein_per_portion}g</span>
                </CardListItem.Spec>
              </CardListItem.Specs>
            </CardListItem.Content>
            <aside>
              <Dialog>
                <DialogTrigger className="w-4 h-4" asChild>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="w-1 h-1" color="red" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>
                      Essa ação não pode ser desfeita. Isso irá deletar o
                      alimento e todas as refeições relacionadas a ele.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={() => deleteFood(food.id)}
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
