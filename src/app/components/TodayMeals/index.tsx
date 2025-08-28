"use client";

import React from "react";
import { BicepsFlexed, Scale, Utensils } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { NewMealDialog } from "@/components/NewMealDialog";
import { TodayMealsLoading } from "./components/Loading";
import { useConsumedMealsQuery } from "@/services/queries/consumed-meals";

export const TodayMeals = () => {
  const { data, error, isFetching } = useConsumedMealsQuery();

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

    return data?.meals?.map((meal) => {
      const totalProtein = Number(meal.total_protein);

      return (
        <div
          data-testid="meal-card"
          key={meal.id}
          className="flex py-3 px-4 justify-between items-center rounded-lg bg-gray-100"
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h3 data-testid="meal-name" className="text-sm font-bold">
                {meal.name}
              </h3>
              <div className="flex items-center gap-1 text-xs">
                <BicepsFlexed size={14} />
                <span className="text-xs">{totalProtein}g</span>
              </div>
            </div>
            <ul>
              {meal.items.map((item) => (
                <li key={item.food_id}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm ">{item.food_name}</span>
                    <div className="flex items-center gap-1">
                      <Scale size={12} />
                      <span className="text-xs">
                        {item.amount}
                        {item.portion_type === "grams" ? "g" : "u"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BicepsFlexed size={12} />
                      <span className="text-xs">
                        {item.calculated_protein}g
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <small data-testid="meal-time">{meal.formattedTime}</small>
          </div>
        </div>
      );
    });
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
