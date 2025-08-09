import { MealsResponse } from "@/@types/dtos";

export const mealsMock: MealsResponse = {
  meals: [
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
    {
      id: "2",
      amount: 100,
      created_at: "2025-08-21 00:41:04",
      proteinConsumed: 100,
      food: {
        name: "Feijão",
        portion_type: "grams",
        portion_amount: 100,
        protein_per_portion: 10,
      },
    },
  ],
};
