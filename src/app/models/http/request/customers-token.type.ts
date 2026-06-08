export type CustomersTokenPostQueries = {
  grant_type: 'password';
  username: string;
  password: string;
  scope: string;
};

export type CustomersTokenPostResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
};
