import { FoodsResponse } from "@/@types/dtos";

export const foodsMock: FoodsResponse = {
  foods: [
    {
      id: "225b290f-a5f1-4da8-93c9-acc249281f13",
      name: "Frango",
      portion_type: "grams",
      portion_amount: 100,
      protein_per_portion: 27,
    },
    {
      id: "049f7465-4f27-4d2b-a77c-cc49b59a17ca",
      name: "Patinho",
      portion_type: "grams",
      portion_amount: 100,
      protein_per_portion: 26,
    },
  ],
};
