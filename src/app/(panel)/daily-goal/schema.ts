import { z } from "zod";

export const dailyGoalSchema = z.object({
  protein: z.coerce.number<number | string>().min(0),
  carbohydrate: z.coerce.number<number | string>().min(0).optional(),
  fat: z.coerce.number<number | string>().min(0).optional(),
  calories: z.coerce.number<number | string>().min(0).optional(),
});

export type DailyGoalSchema = z.infer<typeof dailyGoalSchema>;
