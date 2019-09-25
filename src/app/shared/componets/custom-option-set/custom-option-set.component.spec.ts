import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOptionSetComponent } from './custom-option-set.component';

describe('CustomOptionSetComponent', () => {
  let component: CustomOptionSetComponent;
  let fixture: ComponentFixture<CustomOptionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOptionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOptionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
