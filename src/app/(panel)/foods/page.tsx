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
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { FoodsResponse } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NewFoodDialog } from "@/components/NewFoodDialog";
import { foodsQueryKeys } from "@/services/queries/foods";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Quantidade (porção)</TableHead>
            <TableHead>Proteína (porção)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.foods.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="text-center py-4">
                Nenhum alimento cadastrado
              </TableCell>
            </TableRow>
          ) : (
            data?.foods.map((food) => {
              return (
                <TableRow key={food.id}>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {food.portion_type === "grams" ? "Gramas" : "Unidade"}
                    </Badge>
                  </TableCell>
                  <TableCell>{food.portion_amount}</TableCell>
                  <TableCell>{food.protein_per_portion}g</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="w-1 h-1" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
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
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
