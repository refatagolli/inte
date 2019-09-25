import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsToFillComponent } from './shifts-to-fill.component';

describe('ShiftsToFillComponent', () => {
  let component: ShiftsToFillComponent;
  let fixture: ComponentFixture<ShiftsToFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftsToFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsToFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
