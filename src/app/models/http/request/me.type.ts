export type CustomerGetResponse = {
  id: string;
  version: number;
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
  addresses: [string];
  shippingAddressIds: [];
  billingAddressIds: [];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
  customerGroupAssignments: [];
};

export type CustomerGetQueries = {
  id: number;
};

export type CustomerSetFirstNameAction = {
  action: 'setFirstName';
  firstName?: string;
};

export type CustomerSetLastNameAction = {
  action: 'setLastName';
  lastName?: string;
};

export type CustomerSetDateOfBirthAction = {
  action: 'setDateOfBirth';
  dateOfBirth?: string;
};

export type CustomerUpdateAction =
  CustomerSetFirstNameAction | CustomerSetLastNameAction | CustomerSetDateOfBirthAction;

export type CustomerUpdateBody = {
  version: number;
  actions: CustomerUpdateAction[];
};

export type CustomerPatchResponse = CustomerGetResponse;
