import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMobileUserComponent } from './manage-mobile-user.component';

describe('ManageMobileUserComponent', () => {
  let component: ManageMobileUserComponent;
  let fixture: ComponentFixture<ManageMobileUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMobileUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMobileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
