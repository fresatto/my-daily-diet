import { Suspense } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/PageHeader";
import { NewMealDialog } from "@/components/NewMealDialog";
import { ListLoading } from "@/components/ListLoading";
import { MealsList } from "./components/MealsList";

export default function Meals() {
  return (
    <div>
      <PageHeader
        title="Refeições cadastradas"
        action={
          <NewMealDialog>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Cadastrar refeição
            </Button>
          </NewMealDialog>
        }
      />

      <Suspense fallback={<ListLoading />}>
        <MealsList />
      </Suspense>
    </div>
  );
}
