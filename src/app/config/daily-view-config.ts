import {DailyViewConfigModel} from '../models/daily-view-config-model';

export const dailyView: DailyViewConfigModel = {
  date: {
    from: 0,
    to: 0,
    currentDate: 0
  },
  dateRange: 'weekly',
  viewType: 'shift'
};
