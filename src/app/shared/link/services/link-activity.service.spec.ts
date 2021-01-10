import { TestBed } from '@angular/core/testing';

import { LinkActivityService } from './link-activity.service';

describe('LinkActivityService', () => {
  let service: LinkActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
