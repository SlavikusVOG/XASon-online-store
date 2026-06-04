import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../http/api.service';
import { PostRequest } from '../http/api.types';
import { AppCredentialsAccessTokenPostQueries } from '../../types/http-request/app-credentials.types';
import { getBasicAuthHeader } from '../http/api.utils';

@Injectable({
  providedIn: 'root',
})
export class AppCredentialsService {
  private readonly apiService = inject(ApiService);

  private getAccessToken() {
    const request: PostRequest<{ Q: AppCredentialsAccessTokenPostQueries }> = {
      queries: {
        grant_type: 'client_credentials',
        scope: environment.commercetools.scopes.join(' '),
      },
      headers: {
        Authorization: getBasicAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return this.apiService.appCredentialsAccessTokenPost(request);
  }

  public registerClient() {
    // TODO: remove module?
  }
}
