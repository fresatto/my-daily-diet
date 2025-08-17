"use client";

import { Suspense, useState } from "react";
import { PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Period } from "@/@types/dtos";
import { PageHeader } from "@/components/PageHeader";
import { NewMealDialog } from "@/components/NewMealDialog";
import { ListLoading } from "@/components/ListLoading";
import { useRouter, useSearchParams } from "next/navigation";
import { MealsList } from "./components/MealsList";

export default function Meals() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const period = searchParams.get("period");

  const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(
    period ? (period as Period) : Period.TODAY
  );

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    router.push(`/meals?period=${period}`);
  };

  return (
    <div>
      <PageHeader
        title="Refeições cadastradas"
        action={
          <div className="flex gap-2">
            <Select
              value={selectedPeriod}
              onValueChange={(value: Period) => handlePeriodChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Period.TODAY}>Hoje</SelectItem>
                <SelectItem value={Period.YESTERDAY}>Ontem</SelectItem>
                <SelectItem value={Period.LAST_7_DAYS}>
                  Últimos 7 dias
                </SelectItem>
                <SelectItem value={Period.MONTH}>Mês</SelectItem>
              </SelectContent>
            </Select>
            <NewMealDialog>
              <Button>
                <PlusIcon className="w-4 h-4" />
                Cadastrar refeição
              </Button>
            </NewMealDialog>
          </div>
        }
      />

      <Suspense fallback={<ListLoading />}>
        <MealsList />
      </Suspense>
    </div>
  );
}
