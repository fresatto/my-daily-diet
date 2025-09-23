import { FormattedMeal } from "@/@types/meal";
import { MealItemList } from "../MealItemList";

type ListProps = {
  meals: FormattedMeal[];
  renderMeal?: (meal: FormattedMeal) => React.ReactNode;
};

export const List = ({ meals, renderMeal }: ListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {meals.map((meal) =>
        renderMeal ? (
          renderMeal(meal)
        ) : (
          <MealItemList key={meal.id} meal={meal} />
        )
      )}
    </div>
  );
};
