import { TestBed } from '@angular/core/testing';

import { ProudectsService } from './proudects.service';

describe('ProudectsService', () => {
  let service: ProudectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProudectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
