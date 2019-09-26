import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@theme/services/config.service';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  currentRoute: Observable<String>;
  routeNamesMapping: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param activatedRoute
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    public route: Router
  ) {
    this.routeNamesMapping = {
      '': 'Daily',
      'daily': 'Daily',
      'home': 'Staff Directory'
    };

    // Set the defaults
    this.userStatusOptions = [];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'tr',
        title: 'Turkish',
        flag: 'tr'
      }
    ];

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
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.currentRoute = this.route.events.pipe(
      takeUntil(this._unsubscribeAll),
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        console.log(event.url.replace('/', ''));
        return this.routeNamesMapping[event.url.replace('/', '')];
      })
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
    console.log(value);
  }


}
