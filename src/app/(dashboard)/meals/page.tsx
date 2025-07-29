"use client";

import Link from "next/link";
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
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

import { Meal, MealsResponse } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const meals: Meal[] = [
  {
    id: "1",
    amount: 2,
    created_at: "2025-07-28 23:16:45",
    proteinConsumed: 5.4,
    food: {
      name: "Ovo",
      portion_type: "unit",
      portion_amount: 1,
      protein_per_portion: 2.7,
    },
  },
  {
    id: "2",
    amount: 1,
    created_at: "2025-07-28 23:16:45",
    proteinConsumed: 5.4,
    food: {
      name: "Frango",
      portion_type: "unit",
      portion_amount: 1,
      protein_per_portion: 2.7,
    },
  },
];

export default function Meals() {
  const { data } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals");

      return response.data;
    },
  });

  return (
    <div>
      <PageHeader
        title="Refeições cadastradas"
        action={
          <Button>
            <PlusIcon className="w-4 h-4" />
            <Link href="/meals/create">Cadastrar refeição</Link>
          </Button>
        }
      />
      <Table>
        <TableCaption>Todas as refeições cadastradas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo de porção</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Proteína consumida</TableHead>
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
              <TableCell>{meal.amount}</TableCell>
              <TableCell>{meal.proteinConsumed}g</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <PencilIcon className="w-1 h-1" />
                </Button>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="w-1 h-1" color="red" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
