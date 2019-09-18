import { TestBed } from '@angular/core/testing';

import { ShiftManagementService } from './shift-management.service';

describe('ShiftManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftManagementService = TestBed.get(ShiftManagementService);
    expect(service).toBeTruthy();
  });
});
