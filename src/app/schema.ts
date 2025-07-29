import { z } from "zod";

export const dailyGoalSchema = z.object({
  protein: z
    .string()
    .transform((value) => Number(value))
    .refine(
      (value) => value > 10,
      "Proteína deve ser maior que 10. E pelo menos 2.2x o seu peso"
    ),
});

export type DailyGoalSchema = z.infer<typeof dailyGoalSchema>;
