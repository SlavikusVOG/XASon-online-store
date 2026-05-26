import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../http/api.service';
import { PostRequest } from '../http/api.types';
import { AppCredentialsAccessTokenPostQueries } from '../../types/http-request/app-credentials.types';

@Injectable({
  providedIn: 'root',
})
export class AppCredentialsService {
  private readonly apiService = inject(ApiService);

  getAccessToken() {
    const request: PostRequest<{ Q: AppCredentialsAccessTokenPostQueries }> = {
      queries: {
        grant_type: 'client_credentials',
        scope: environment.commercetools.scopes.join(' '),
      },
    };
    return this.apiService.appCredentialsAccessTokenPost(request);
  }
}
