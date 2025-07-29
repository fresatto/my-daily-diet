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

const foods: Food[] = [
  {
    id: "1",
    name: "Patinho",
    portion_type: "grams",
    portion_amount: 100,
    protein_per_portion: 26,
  },
  {
    id: "2",
    name: "Frango",
    portion_type: "unit",
    portion_amount: 100,
    protein_per_portion: 26,
  },
  {
    id: "3",
    name: "Carne",
    portion_type: "grams",
    portion_amount: 100,
    protein_per_portion: 26,
  },
];

export default function Foods() {
  return (
    <div>
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
          {foods.map((food, index) => {
            return (
              <TableRow key={food.id}>
                <TableCell>{food.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {food.portion_type === "grams" ? "Gramas" : "Unidade"}
                  </Badge>
                </TableCell>
                <TableCell>{food.portion_amount}</TableCell>
                <TableCell>{food.protein_per_portion}</TableCell>
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
