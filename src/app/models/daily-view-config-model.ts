export interface DailyViewConfigModel {
  viewType: 'shift' | 'unit';
  dateRange: 'daily' | 'weekly' | 'monthly';
  date: number;
}
