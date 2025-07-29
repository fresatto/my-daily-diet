import { z } from "zod";

export const createMealSchema = z.object({
  food_id: z.uuid("Alimento é obrigatório"),
  amount: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => value > 0, {
      message: "Quantidade deve ser maior que 0",
    }),
});

export type CreateMealSchema = z.infer<typeof createMealSchema>;
