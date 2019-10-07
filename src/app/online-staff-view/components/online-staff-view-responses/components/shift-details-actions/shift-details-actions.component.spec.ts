import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDetailsActionsComponent } from './shift-details-actions.component';

describe('ShiftDetailsActionsComponent', () => {
  let component: ShiftDetailsActionsComponent;
  let fixture: ComponentFixture<ShiftDetailsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftDetailsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftDetailsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
