import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {navigation} from '../../../config/navigation';
import {FuseConfigService} from '@theme/services/config.service';
import {PerfectScrollbarDirective} from '@theme/directives/perfect-scrollbar/perfect-scrollbar.directive';

@Component({
  selector: 'vertical-layout-2',
  templateUrl: './layout-2.component.html',
  styleUrls: ['./layout-2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout2Component implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;
  showScrollToTop = false;
  @ViewChild(PerfectScrollbarDirective) private _container: PerfectScrollbarDirective;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   */
  constructor(
    private _fuseConfigService: FuseConfigService
  ) {
    // Set the defaults
    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onContentScroll(event) {
    this.showScrollToTop = event.srcElement.scrollTop > 800;
  }

  scrollContainerToTop() {
    this._container.scrollToTop(0, 200);
  }
}
