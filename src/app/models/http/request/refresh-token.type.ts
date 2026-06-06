export type RefreshTokenPostQueries = {
  grant_type: 'refresh_token';
  refresh_token: string;
};

export type RefreshTokenPostResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
};
