"use client";

import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Food, FoodsResponse } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
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
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function Foods() {
  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await api.get<FoodsResponse>("/food");
      return response.data;
    },
  });

  return (
    <div>
      <PageHeader
        title="Alimentos cadastrados"
        action={
          <Button>
            <PlusIcon />
            <Link href="/foods/create">Adicionar</Link>
          </Button>
        }
      />
      <Table>
        <TableCaption>Todos os alimentos cadastrados.</TableCaption>
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
          {data?.foods.map((food) => {
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
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="w-1 h-1" color="red" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
