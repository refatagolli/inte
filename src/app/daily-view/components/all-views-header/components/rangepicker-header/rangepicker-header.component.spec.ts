import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangepickerHeaderComponent } from './rangepicker-header.component';

describe('RangepickerHeaderComponent', () => {
  let component: RangepickerHeaderComponent;
  let fixture: ComponentFixture<RangepickerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangepickerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangepickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
