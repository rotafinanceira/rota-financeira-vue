export type FinanceSummary = {
  recommendedDailyValue: number;
  maintenanceReserve: number;
  lastWeekProgress: number;
};

export type Checkin = {
  date: string;
  completed: boolean;
};

export type FinanceState = {
  summary: FinanceSummary;
  checkins: Checkin[];
};
