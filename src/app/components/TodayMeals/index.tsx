"use client";

import React from "react";
import { Utensils } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useMealsQuery } from "@/services/queries/meals";
import { NewMealDialog } from "@/components/NewMealDialog";
import { TodayMealsLoading } from "./components/Loading";

export const TodayMeals = () => {
  const { data, error, isFetching } = useMealsQuery();

  const shouldRenderEmptyState = !data?.meals || data?.meals?.length === 0;

  const shouldRenderNewMealButton = !error && !isFetching;

  const renderContent = () => {
    if (isFetching) {
      return <TodayMealsLoading />;
    }

    if (error) {
      return <Card.Error title="Erro ao carregar refeições diárias." />;
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
    <Card.Container>
      <div className="flex items-center gap-2">
        <Utensils size={16} />
        <h3 className="text-sm font-bold">Refeições de hoje</h3>
      </div>
      {renderContent()}

      {shouldRenderNewMealButton && (
        <NewMealDialog>
          <Button data-testid="new-meal-button">Nova refeição</Button>
        </NewMealDialog>
      )}
    </Card.Container>
  );
};
