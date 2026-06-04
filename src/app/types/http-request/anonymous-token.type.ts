export type AnonymousSessionAccessTokenPostResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
};

export type AnonymousSessionAccessTokenPostQueries = {
  grant_type: 'client_credentials';
  scope: string;
  anonymous_id: string;
};
