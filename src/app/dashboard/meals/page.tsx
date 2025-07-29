import { Food } from "@/@types/dtos";
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
import { PencilIcon, TrashIcon } from "lucide-react";

import { Meal } from "@/@types/dtos";

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
  return (
    <div>
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
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.food.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {meal.food.portion_type === "grams" ? "Gramas" : "Unidade"}
                </Badge>
              </TableCell>
              <TableCell>{meal.amount}</TableCell>
              <TableCell>{meal.proteinConsumed}g</TableCell>
              <TableCell>
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
