export type CustomersPostResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  customer: Customer;
};

export type CustomersPostBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type Customer = {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: [];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  customerGroupAssignments: string[];
  stores: string[];
  authenticationMode: string;
};
