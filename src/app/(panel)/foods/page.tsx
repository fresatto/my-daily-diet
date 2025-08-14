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
import {
  BicepsFlexed,
  LoaderCircle,
  PlusIcon,
  Scale,
  TrashIcon,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { NewFoodDialog } from "@/components/NewFoodDialog";
import { useDeleteFoodMutation, useFoodsQuery } from "@/services/queries/foods";
import { CardListItem } from "@/components/CardListItem";
import { ListLoading } from "@/components/ListLoading";

export default function Foods() {
  const { data, isLoading } = useFoodsQuery();
  const {
    mutate: deleteFood,
    variables: foodId,
    isPending,
  } = useDeleteFoodMutation();

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
        {isLoading ? (
          <ListLoading />
        ) : (
          data?.foods.map((food) => (
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
              <aside className="w-4 h-4">
                <Dialog>
                  <DialogTrigger className="w-4 h-4" asChild>
                    <Button variant="ghost" size="icon">
                      {foodId === food.id && isPending ? (
                        <LoaderCircle className="w-1 h-1 animate-spin" />
                      ) : (
                        <TrashIcon className="w-1 h-1" color="red" />
                      )}
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
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => deleteFood(food.id)}
                        >
                          Deletar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </aside>
            </CardListItem.Container>
          ))
        )}
      </div>
    </div>
  );
}
