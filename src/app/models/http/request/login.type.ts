export type User = {
  addresses: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};

export type LoginPostResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};
