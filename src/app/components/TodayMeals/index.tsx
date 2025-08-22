"use client";

import React from "react";
import { Utensils } from "lucide-react";

import { NewMealDialog } from "@/components/NewMealDialog";
import { Button } from "@/components/ui/button";
import { useMealsQuery } from "@/services/queries/meals";
import { Card } from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Card.Container>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Resumo</h3>
        <Utensils />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card.Container>
  );
};

export const TodayMeals = () => {
  const { data, isFetching } = useMealsQuery();

  const shouldRenderEmptyState = !data?.meals || data?.meals?.length === 0;

  const renderContent = () => {
    if (isFetching) {
      return <Loading />;
    }

    if (shouldRenderEmptyState) {
      return (
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            Nenhuma refeição cadastrada. Clique no botão abaixo para cadastrar.
          </p>
        </div>
      );
    }

    return data?.meals?.map((meal) => (
      <div
        data-testid="meal-card"
        key={meal.id}
        className="flex py-3 px-4 justify-between items-center rounded-lg bg-gray-100"
      >
        <div className="flex flex-col">
          <h3 data-testid="meal-name" className="text-sm font-bold">
            {meal.food.name}
          </h3>
          <small data-testid="meal-time">{meal.formattedTime}</small>
        </div>
        <div className="flex flex-col items-end text-xs">
          <p className="font-bold">{meal.proteinConsumed}g</p>
          <p>proteína</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <Utensils size={16} />
        <h3 className="text-sm font-bold">Refeições de hoje</h3>
      </div>
      {renderContent()}
      <NewMealDialog>
        <Button data-testid="new-meal-button">Nova refeição</Button>
      </NewMealDialog>
    </div>
  );
};
