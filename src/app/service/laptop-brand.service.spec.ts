import { TestBed } from '@angular/core/testing';

import { LaptopBrandService } from './laptop-brand.service';

describe('LaptopBrandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaptopBrandService = TestBed.get(LaptopBrandService);
    expect(service).toBeTruthy();
  });
});
