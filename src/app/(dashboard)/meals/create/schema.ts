import { z } from "zod";

export const createMealSchema = z.object({
  food_id: z.uuid("Alimento é obrigatório"),
  amount: z.number().refine(
    (value) => {
      const number = Number(value);
      return number > 1;
    },
    {
      message: "Quantidade deve ser maior que 1 (g ou unidade).",
    }
  ),
});

export type CreateMealSchema = z.infer<typeof createMealSchema>;
