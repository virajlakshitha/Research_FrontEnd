import { TestBed } from '@angular/core/testing';

import { PcpartServiceService } from './pcpart-service.service';

describe('PcpartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PcpartServiceService = TestBed.get(PcpartServiceService);
    expect(service).toBeTruthy();
  });
});
