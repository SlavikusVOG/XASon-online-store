export type AppCredentialsAccessTokenPostQueries = {
  grant_type: 'client_credentials' | 'refresh_token';
  scope?: string;
};
