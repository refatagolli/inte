import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {takeUntil, tap} from 'rxjs/operators';
import {DailyViewService} from '../../../services/daily-view.service';
import {Subject} from 'rxjs';
import {ScrollBalancerService} from '../../services/scroll-balancer.service';
import {PerfectScrollbarDirective} from '@theme/directives/perfect-scrollbar/perfect-scrollbar.directive';

@Component({
  selector: 'app-weekly-view-header',
  templateUrl: './weekly-view-header.component.html',
  styleUrls: ['./weekly-view-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyViewHeaderComponent implements OnInit, OnDestroy {

  config: DailyViewConfigModel;
  @ViewChild(PerfectScrollbarDirective) _container: PerfectScrollbarDirective;
  @Input() weekdays: any[];
  @Input() selectOptions: string[] = [];
  @Input() selectedField: string;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _dailyViewService: DailyViewService,
              private _cdr: ChangeDetectorRef,
              private _scrollBalancer: ScrollBalancerService) {
  }

  ngOnInit() {
    this._dailyViewService.dailyViewConfig.pipe(
      tap(console.log),
      takeUntil(this._unsubscribeAll)
    ).subscribe(e => this.config = e);

    this._scrollBalancer.scroll.subscribe(e => this._container.elementRef.nativeElement.scrollLeft = e);
    this._scrollBalancer.scrollToLeft.subscribe(e => this._container.elementRef.nativeElement.scrollLeft = 0);
    this._scrollBalancer.scrollToRight.subscribe(e => this._container.scrollToRight(0, 200));

    this._cdr.detectChanges();
  }

  changeViewType(viewType: 'shift' | 'unit') {
    if (viewType !== this.config.viewType) {
      this.config.viewType = viewType;
      this._dailyViewService.dailyViewConfig.next(this.config);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  isSunday(date) {
    return new Date(date).getDay() === 0;
  }

  hasOverflow() {
    return true;
  }

  hasOverflowLeft() {
    return this.hasOverflow() && this._container.elementRef.nativeElement.scrollLeft > 0;
  }

  hasOverflowRight() {
    return this.hasOverflow() && this._container.elementRef.nativeElement.clientWidth +
      this._container.elementRef.nativeElement.scrollLeft !==
      this._container.elementRef.nativeElement.scrollWidth;
  }

  onHeaderScroll(event) {
    this._scrollBalancer.scroll.next(this._container.elementRef.nativeElement.scrollLeft);
  }

  moveLeft() {
    this._scrollBalancer.scrollToLeft.next();
  }

  moveRight() {
    this._scrollBalancer.scrollToRight.next();
  }
}
