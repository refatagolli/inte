import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DailyViewConfigModel} from '../models/daily-view-config-model';
import {dailyView} from '../config/daily-view-config';

@Injectable({
  providedIn: 'root'
})
export class DailyViewService {

  dailyViewConfig: BehaviorSubject<DailyViewConfigModel> = new BehaviorSubject(dailyView);

  constructor() {
  }
}
