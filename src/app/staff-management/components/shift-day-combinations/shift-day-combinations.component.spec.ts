import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDayCombinationsComponent } from './shift-day-combinations.component';

describe('ShiftDayCombinationsComponent', () => {
  let component: ShiftDayCombinationsComponent;
  let fixture: ComponentFixture<ShiftDayCombinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftDayCombinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftDayCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
