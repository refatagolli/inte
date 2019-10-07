import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangepickerModalComponent } from './rangepicker-modal.component';

describe('RangepickerModalComponent', () => {
  let component: RangepickerModalComponent;
  let fixture: ComponentFixture<RangepickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangepickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
