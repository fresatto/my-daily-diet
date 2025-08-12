export enum WeekProgressDaysEnum {
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}

export type WeekProgress = Record<
  string,
  {
    total: number;
    goalAchieved: boolean;
    dailyGoalPercentage: number;
  }
>;

export type WeekProgressResponse = {
  weekProgress: WeekProgress;
};
