import { Button } from "@/components/ui/button";
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
import { TrashIcon } from "lucide-react";

type MealListItemActionProps = {
  onConfirmDeleteMeal: () => void;
  loading?: boolean;
};

export const MealListItemAction: React.FC<MealListItemActionProps> = ({
  onConfirmDeleteMeal,
  loading,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-4 h-4" asChild>
        <Button variant="ghost" size="icon" loading={loading}>
          <TrashIcon className="w-1 h-1" color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Ao excluir a refeição, todas as{" "}
            <strong>refeições consumidas</strong> relacionadas a ela serão
            apagadas. Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onConfirmDeleteMeal}>
              Deletar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
