import React from "react";
import { BicepsFlexed, Scale } from "lucide-react";

import { MealItem } from "@/@types/meal";

type MealItemListProps = {
  food: MealItem;
};

export const MealItemList: React.FC<MealItemListProps> = ({ food }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-sm ">{food.food_name}</span>
      <div className="flex items-center justify-end gap-4  w-[140px]">
        <div className="flex items-center gap-1">
          <Scale size={12} />
          <span className="text-xs">
            {food.amount}
            {food.portion_type === "grams" ? "g" : "u"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <BicepsFlexed size={12} />
          <span className="text-xs">{food.calculated_protein}g</span>
        </div>
      </div>
    </div>
  );
};
