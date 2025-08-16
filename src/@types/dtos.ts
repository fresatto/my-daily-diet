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

export enum Period {
  TODAY = "1",
  YESTERDAY = "2",
  LAST_7_DAYS = "3",
  MONTH = "4",
}

export type FoodsResponse = {
  foods: Food[];
};

export type MealsResponse = {
  meals: Meal[];
};
