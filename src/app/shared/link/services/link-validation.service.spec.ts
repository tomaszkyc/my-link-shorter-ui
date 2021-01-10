import { TestBed } from '@angular/core/testing';

import { LinkValidationService } from './link-validation.service';

describe('LinkValidationService', () => {
  let service: LinkValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
