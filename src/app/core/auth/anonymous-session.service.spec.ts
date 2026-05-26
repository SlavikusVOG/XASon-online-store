import { TestBed } from '@angular/core/testing';

import { AnonymousSessionService } from './anonymous-session.service';

describe('AnonymousSessionService', () => {
  let service: AnonymousSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymousSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
