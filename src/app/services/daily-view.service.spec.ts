import { TestBed } from '@angular/core/testing';

import { DailyViewService } from './daily-view.service';

describe('DailyViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyViewService = TestBed.get(DailyViewService);
    expect(service).toBeTruthy();
  });
});
