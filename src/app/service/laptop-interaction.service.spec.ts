import { TestBed } from '@angular/core/testing';

import { LaptopInteractionService } from './laptop-interaction.service';

describe('LaptopInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaptopInteractionService = TestBed.get(LaptopInteractionService);
    expect(service).toBeTruthy();
  });
});
