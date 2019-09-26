import { TestBed } from '@angular/core/testing';

import { DynamicFloatingContentService } from './dynamic-floating-content.service';

describe('DynamicFloatingContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicFloatingContentService = TestBed.get(DynamicFloatingContentService);
    expect(service).toBeTruthy();
  });
});
