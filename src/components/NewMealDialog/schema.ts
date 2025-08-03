import { z } from "zod";

export const createMealSchema = z.object({
  food_id: z.uuid("Alimento é obrigatório"),
  amount: z
    .string()
    .min(1, "Campo obrigatório")
    .refine(
      (value) => {
        const number = Number(value);
        return number > 0;
      },
      {
        message: "Quantidade deve ser maior que 1 (g ou unidade).",
      }
    ),
});

export type CreateMealSchema = z.infer<typeof createMealSchema>;
