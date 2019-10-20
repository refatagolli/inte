import { TestBed } from '@angular/core/testing';

import { ScrollBalancerService } from './scroll-balancer.service';

describe('ScrollBalancerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollBalancerService = TestBed.get(ScrollBalancerService);
    expect(service).toBeTruthy();
  });
});
