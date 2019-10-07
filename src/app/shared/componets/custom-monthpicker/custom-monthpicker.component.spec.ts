import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMonthpickerComponent } from './custom-monthpicker.component';

describe('CustomMonthpickerComponent', () => {
  let component: CustomMonthpickerComponent;
  let fixture: ComponentFixture<CustomMonthpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMonthpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMonthpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
