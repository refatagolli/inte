import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTopCardComponent } from './management-top-card.component';

describe('ManagementTopCardComponent', () => {
  let component: ManagementTopCardComponent;
  let fixture: ComponentFixture<ManagementTopCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementTopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
