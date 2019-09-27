import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDataContainerComponent } from './weekly-data-container.component';

describe('WeeklyDataContainerComponent', () => {
  let component: WeeklyDataContainerComponent;
  let fixture: ComponentFixture<WeeklyDataContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyDataContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
