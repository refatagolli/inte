import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDatepickerComponent } from './weekly-datepicker.component';

describe('WeeklyDatepickerComponent', () => {
  let component: WeeklyDatepickerComponent;
  let fixture: ComponentFixture<WeeklyDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
