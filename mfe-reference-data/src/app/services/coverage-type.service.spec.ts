import { TestBed } from '@angular/core/testing';

import { CoverageTypeService } from './coverage-type.service';

describe('CoverageTypeService', () => {
  let service: CoverageTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverageTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
