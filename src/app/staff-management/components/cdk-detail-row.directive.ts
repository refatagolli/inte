import {Directive, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {StaffManagementService} from '../staff-management.service';
import {Observable} from 'rxjs';

@Directive({
  selector: '[cdkDetailRow]'
})
export class CdkDetailRowDirective {
  private row: any;
  private tRef: TemplateRef<any>;
  private opened = false;

  @HostBinding('class.expanded')
  get expended(): boolean {
    return this.opened;
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Input()
  set cdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
      // this.render();
    }
  }

  @Input('cdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.tRef) {
      this.tRef = value;
      // this.render();
    }
  }

  constructor(
    public vcRef: ViewContainerRef,
    public _staffManagementService: StaffManagementService
  ) {
    this._staffManagementService.getClickedProfile()
      .pipe()
      .subscribe(item => {
        console.log('opened', this.opened);
        console.log('row', this.row, item);
        if (this.row && this.row.id === item.id || (this.row &&(this.row.id !== item.id) && this.opened)) {
          this.onClick(item);
          console.log('opened', this.opened);
        }
    });

    this._staffManagementService.getUpdatedRow()
      .pipe()
      .subscribe(item => {
        this.row = item;
      });
  }

  // @HostListener('click')
  onClick(item: any): void {
    this.toggle();
    if (this.row.id === item.id) {
      this.valueChange.next({ 'row' : this.row, 'opened' : this.opened } );
    }
  }

  toggle(): void {
    if (this.opened) {
      this.vcRef.clear();
    } else {
      this.render();
    }
    this.opened = this.vcRef.length > 0;
  }



  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
    }
  }
}
