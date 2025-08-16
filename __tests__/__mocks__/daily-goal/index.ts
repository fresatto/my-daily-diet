import {
  DailyGoalResponse,
  DailyGoalSummaryResponse,
} from "@/@types/daily-goal";

export const dailyGoalMock: DailyGoalResponse = {
  dailyGoal: {
    protein: 300,
  },
};

export const dailyGoalSummaryMock: DailyGoalSummaryResponse = {
  proteinConsumed: 150,
  achieved: true,
};
