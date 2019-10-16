import {DailyViewConfigModel} from '../models/daily-view-config-model';
import * as moment from 'moment';

export const dailyView: DailyViewConfigModel = {
  date: {
    from: 0,
    to: 0,
    currentDate: moment().toDate().getTime()
  },
  dateRange: 'daily',
  viewType: 'shift'
};
