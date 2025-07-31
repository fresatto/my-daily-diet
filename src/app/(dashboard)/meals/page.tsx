"use client";

import Link from "next/link";
import { format } from "date-fns";
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

import { MealsResponse } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { parseDateToLocalUTC } from "@/lib/date";

export default function Meals() {
  const { data } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await api.get<MealsResponse>("/meals");

      const meals = response.data.meals.map((meal) => {
        const localDate = parseDateToLocalUTC(meal.created_at);

        return {
          ...meal,
          created_at: format(localDate, "dd/MM/yyyy HH:mm"),
        };
      });

      return {
        meals,
      };
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
              <TableCell>{meal.amount}</TableCell>
              <TableCell>{meal.proteinConsumed}g</TableCell>
              <TableCell>{meal.created_at}</TableCell>
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
