import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {DailyViewService} from '../../../services/daily-view.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {PerfectScrollbarDirective} from '@theme/directives/perfect-scrollbar/perfect-scrollbar.directive';
import {ScrollBalancerService} from '../../services/scroll-balancer.service';

@Component({
  selector: 'weekly-content',
  templateUrl: './weekly-content.component.html',
  styleUrls: ['./weekly-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class WeeklyContentComponent implements OnInit, OnDestroy {
  @Input() elements: any[] = [];
  @Input() weekdays = [];
  config: DailyViewConfigModel;
  @Input() primaryField: string;
  @Input() selectedField: string;
  @Input() selectOptions: string[] = [];
  currentDate = new Date().getTime();
  @ViewChild(PerfectScrollbarDirective) _container: PerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _dailyViewService: DailyViewService,
              private _cdr: ChangeDetectorRef,
              private _scrollBalancer: ScrollBalancerService) {
  }

  get currentElement() {
    return this.elements[this.selectOptions.indexOf(this.selectedField)];
  }


  ngOnInit() {
    this._dailyViewService.dailyViewConfig.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(e => this.config = e);

    this._scrollBalancer.scroll.subscribe(e => this._container.elementRef.nativeElement.scrollLeft = e);
    this._scrollBalancer.scrollToLeft.subscribe(e => this._container.elementRef.nativeElement.scrollLeft = 0);
    this._scrollBalancer.scrollToRight.subscribe(e => this._container.scrollToRight(0, 200));
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  selectDate(date: any) {
    this.currentDate = date;
  }

  getShiftDetails(element): ShiftDetails {
    let shiftHours = '';
    let unit = '';
    if (this.config.viewType === 'shift') {
      shiftHours = this.currentElement.shiftTime;
      unit = element.value;
    } else {
      shiftHours = element.shiftTime;
      unit = this.currentElement.value;
    }
    return {shiftHours, unit};
  }

  updateCRD() {
    this._cdr.markForCheck();
  }

  onWheelEvent($event) {
    this._scrollBalancer.scroll.next(this._container.elementRef.nativeElement.scrollLeft);
    this.updateCRD();
  }
}
