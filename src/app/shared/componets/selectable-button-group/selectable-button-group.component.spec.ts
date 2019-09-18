import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableButtonGroupComponent } from './selectable-button-group.component';

describe('SelectableButtonGroupComponent', () => {
  let component: SelectableButtonGroupComponent;
  let fixture: ComponentFixture<SelectableButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectableButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
