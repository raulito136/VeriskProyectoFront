import { TestBed } from '@angular/core/testing';

import { ClaimStatusService } from './claim-status.service';

describe('ClaimStatusService', () => {
  let service: ClaimStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
