import { FormattedMeal } from "@/@types/meal";

export type SelectMealDialogProps = {
  children: React.ReactNode;
};

export type SelectMealDialogMealsListProps = {
  meals: FormattedMeal[];
  onSuccessCreateConsumedMeal: () => void;
};
