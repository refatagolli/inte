export interface DailyViewConfigModel {
  viewType: 'shift' | 'unit';
  dateRange: 'daily' | 'weekly' | 'monthly' | 'custom' | 'today';
  date: {
    from: number;
    to: number;
    currentDate: number;
  };
}
