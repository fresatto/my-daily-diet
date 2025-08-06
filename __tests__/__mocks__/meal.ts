import { Meal } from "@/@types/dtos";

export const mealsMock: Meal[] = [
  {
    id: "1",
    amount: 100,
    created_at: "2025-08-06 00:41:04",
    proteinConsumed: 100,
    food: {
      name: "Arroz",
      portion_type: "unit",
      portion_amount: 100,
      protein_per_portion: 10,
    },
  },
];
