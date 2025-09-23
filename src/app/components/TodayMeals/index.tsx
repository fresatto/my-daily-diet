"use client";

import React from "react";
import { Utensils } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { NewMealDialog } from "@/components/NewMealDialog";
import { TodayMealsLoading } from "./components/Loading";
import { useConsumedMealsQuery } from "@/services/queries/consumed-meals";
import { SelectMealDialog } from "./components/SelectMealDialog";
import { MealList } from "@/components/MealList";
import { TodayMealsEmpty } from "./components/Empty";

export const TodayMeals = () => {
  const { data, error, isFetching } = useConsumedMealsQuery();

  const shouldRenderEmptyState = !data?.meals || data?.meals?.length === 0;

  const shouldRenderNewMealButton = !error && !isFetching;

  return (
    <Card.Container>
      <div className="flex items-center gap-2">
        <Utensils size={16} />
        <h3 className="text-sm font-bold">Refeições de hoje</h3>
      </div>
      {isFetching && <TodayMealsLoading />}
      {error && <Card.Error title="Erro ao carregar refeições diárias." />}
      {shouldRenderEmptyState ? (
        <TodayMealsEmpty />
      ) : (
        <MealList.List meals={data?.meals} />
      )}

      <SelectMealDialog>
        <Button>Selecionar refeição</Button>
      </SelectMealDialog>
      {shouldRenderNewMealButton && (
        <NewMealDialog>
          <Button data-testid="new-meal-button" variant="ghost">
            Cadastrar nova refeição
          </Button>
        </NewMealDialog>
      )}
    </Card.Container>
  );
};
