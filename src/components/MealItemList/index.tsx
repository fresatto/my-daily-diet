import React from "react";
import { BicepsFlexed, Scale } from "lucide-react";

import { Meal } from "@/@types/meal";

type MealItemListProps = {
  meal: Meal & { formattedTime: string };
};

export const MealItemList: React.FC<MealItemListProps> = ({ meal }) => {
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
              <div className="flex justify-between items-center gap-4">
                <span className="text-sm ">{item.food_name}</span>
                <div className="flex items-center justify-end gap-4  w-[140px]">
                  <div className="flex items-center gap-1">
                    <Scale size={12} />
                    <span className="text-xs">
                      {item.amount}
                      {item.portion_type === "grams" ? "g" : "u"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BicepsFlexed size={12} />
                    <span className="text-xs">{item.calculated_protein}g</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <small data-testid="meal-time">{meal.formattedTime}</small>
      </div>
    </div>
  );
};
