import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillShiftComponent } from './fill-shift.component';

describe('FillShiftComponent', () => {
  let component: FillShiftComponent;
  let fixture: ComponentFixture<FillShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
