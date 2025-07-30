import { z } from "zod";

export const createMealSchema = z.object({
  food_id: z.uuid("Alimento é obrigatório"),
  amount: z.string().refine(
    (value) => {
      const number = Number(value);
      return number > 10;
    },
    {
      message: "Quantidade deve ser maior que 10g",
    }
  ),
});

export type CreateMealSchema = z.infer<typeof createMealSchema>;
