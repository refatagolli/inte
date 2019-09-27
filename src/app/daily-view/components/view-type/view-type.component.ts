import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {FormControl} from '@angular/forms';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';

@Component({
  selector: 'view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewTypeComponent implements OnInit {
  slideToggleContrl: FormControl = new FormControl(true);
  dailyViewConfig: DailyViewConfigModel;


  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {
    this.slideToggleContrl.valueChanges.subscribe(value => {
      this.dailyViewConfig.viewType = !value ? 'shift' : 'unit';
      this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
    });

    this._dailyViewService.dailyViewConfig.subscribe(dailyViewConfig => {
      this.dailyViewConfig = dailyViewConfig;
      this.slideToggleContrl.patchValue(dailyViewConfig.viewType !== 'shift', {emitEvent: false});
    });
  }

}
