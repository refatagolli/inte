import { TestBed } from '@angular/core/testing';

import { ManageUsersAccountService } from './manage-users-account.service';

describe('ManageUsersAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageUsersAccountService = TestBed.get(ManageUsersAccountService);
    expect(service).toBeTruthy();
  });
});
