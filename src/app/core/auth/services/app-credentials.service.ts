import { inject, Injectable } from '@angular/core';
import { ApiService, getBasicAuthHeader, PostRequest } from '@core/http';
import { environment } from '@environments/environment';
import { AppCredentialsAccessTokenPostQueries } from '@models/http';

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
