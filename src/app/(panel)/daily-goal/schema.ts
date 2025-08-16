import { z } from "zod";

export const dailyGoalSchema = z.object({
  protein: z.coerce
    .number<number | string>()
    .min(1, { message: "Proteína é obrigatória." }),
  carbohydrate: z.coerce.number<number | string>().min(0).optional(),
  fat: z.coerce.number<number | string>().min(0).optional(),
  calories: z.coerce.number<number | string>().min(0).optional(),
});

export type DailyGoalSchema = z.infer<typeof dailyGoalSchema>;
