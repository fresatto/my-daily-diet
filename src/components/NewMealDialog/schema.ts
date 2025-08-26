import { z } from "zod";

export const createMealSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  items: z.array(
    z.object({
      food_id: z.uuid("Alimento é obrigatório"),
      amount: z.number().min(1, "Quantidade é obrigatória"),
    })
  ),
});

export type CreateMealSchema = z.infer<typeof createMealSchema>;
