import { z } from "zod";

export const createFoodSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  portion_amount: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((value) => Number(value) > 0, {
      message: "Quantidade deve ser maior que 0",
    }),
  protein_per_portion: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((value) => Number(value) > 0, {
      message: "Proteína deve ser maior que 0",
    }),
  portion_type: z.enum(["grams", "unit"], {
    message: "Campo obrigatório",
  }),
});

export type CreateFoodSchema = z.infer<typeof createFoodSchema>;
