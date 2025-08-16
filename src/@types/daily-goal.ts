export type DailyGoal = {
  protein: number;
  carbohydrate?: number;
  fat?: number;
  calories?: number;
};

export type DailyGoalSummary = {
  proteinConsumed: number;
  achieved: boolean;
};

export type DailyGoalSummaryResponse = DailyGoalSummary;

export type DailyGoalResponse = {
  dailyGoal: DailyGoal;
};

export type DailyGoalRequest = DailyGoal;
