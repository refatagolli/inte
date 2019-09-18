import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUnitComponent } from './change-unit.component';

describe('ChangeUnitComponent', () => {
  let component: ChangeUnitComponent;
  let fixture: ComponentFixture<ChangeUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
