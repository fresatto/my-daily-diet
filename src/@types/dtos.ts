export type Food = {
  id: string;
  name: string;
  portion_type: "grams" | "unit";
  portion_amount: number;
  protein_per_portion: number;
};

export type Meal = {
  id: string;
  amount: number;
  created_at: string;
  proteinConsumed: number;
  food: Omit<Food, "id">;
};

export type DailyGoalRequest = {
  protein: number;
};

export type FoodsResponse = {
  foods: Food[];
};

export type MealsResponse = {
  meals: Meal[];
};
