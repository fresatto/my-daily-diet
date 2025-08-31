export type MealItem = {
  food_id: string;
  food_name: string;
  portion_type: "grams" | "unit";
  portion_amount: number;
  protein_per_portion: number;
  amount: number;
  calculated_protein: number;
};

export type Meal = {
  id: string;
  name: string;
  created_at: string;
  total_protein: string;
  items: MealItem[];
};

export type FormattedMeal = Meal & {
  formattedAmount: string;
  formattedTime: string;
  created_at: string;
};

export type MealsResponse = {
  meals: Meal[];
};
