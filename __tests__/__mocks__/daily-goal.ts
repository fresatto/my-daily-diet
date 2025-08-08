import { DailyGoalResponse, DailyGoalSummaryResponse } from "@/@types/dtos";

export const dailyGoalMock: DailyGoalResponse = {
  dailyGoal: {
    created_at: "2025-07-31 02:24:10",
    protein: 300,
  },
};

export const dailyGoalSummaryMock: DailyGoalSummaryResponse = {
  proteinConsumed: 150,
  achieved: true,
};
