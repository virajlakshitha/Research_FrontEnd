import { TestBed } from '@angular/core/testing';

import { LaptopCompareService } from './laptop-compare.service';

describe('LaptopCompareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaptopCompareService = TestBed.get(LaptopCompareService);
    expect(service).toBeTruthy();
  });
});
