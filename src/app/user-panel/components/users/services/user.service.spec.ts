import { TestBed } from '@angular/core/testing';

import { UserDtoService } from './user-dto.service';

describe('UserService', () => {
  let service: UserDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
