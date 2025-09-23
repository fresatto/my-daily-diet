import { BicepsFlexed, Calendar } from "lucide-react";

import { CardListItem } from "@/components/CardListItem";
import { FormattedMeal } from "@/@types/meal";

type MealListItemProps = {
  meal: FormattedMeal;
  action?: React.ReactNode;
};

export const MealListItem = ({ meal, action }: MealListItemProps) => {
  return (
    <CardListItem.Container key={meal.id}>
      <CardListItem.Content>
        <CardListItem.Header>
          <h3 className="text-md font-bold">{meal.name}</h3>
          <CardListItem.Badge>
            <BicepsFlexed />
            {meal.total_protein}g
          </CardListItem.Badge>
        </CardListItem.Header>
        <CardListItem.Specs className="flex gap-2">
          <CardListItem.Spec>
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{meal.created_at}</span>
          </CardListItem.Spec>
        </CardListItem.Specs>
      </CardListItem.Content>
      {action && <aside>{action}</aside>}
    </CardListItem.Container>
  );
};
