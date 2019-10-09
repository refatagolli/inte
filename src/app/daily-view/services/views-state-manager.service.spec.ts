import { TestBed } from '@angular/core/testing';

import { ViewsStateManagerService } from './views-state-manager.service';

describe('ViewsStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewsStateManagerService = TestBed.get(ViewsStateManagerService);
    expect(service).toBeTruthy();
  });
});
