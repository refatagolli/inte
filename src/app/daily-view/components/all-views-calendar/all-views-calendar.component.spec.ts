import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllViewsCalendarComponent } from './all-views-calendar.component';

describe('AllViewsCalendarComponent', () => {
  let component: AllViewsCalendarComponent;
  let fixture: ComponentFixture<AllViewsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllViewsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllViewsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
