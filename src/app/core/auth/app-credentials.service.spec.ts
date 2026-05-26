import { TestBed } from '@angular/core/testing';

import { AppCredentialsService } from './app-credentials.service';

describe('AppCredentialsService', () => {
  let service: AppCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
