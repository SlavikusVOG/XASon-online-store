export type CustomerAddress = {
  id?: string;
  key?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  country: string;
  phone?: string;
  mobile?: string;
  email?: string;
};

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
  dateOfBirth?: string;
  password: string;
  addresses: CustomerAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: string[];
  authenticationMode: string;
  customerGroupAssignments: string[];
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
