export type CustomersPostResponse = {
  addresses: [];
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
};

export type CustomersPostBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
