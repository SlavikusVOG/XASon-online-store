export type ProcessedUser = {
  id: string;
  address: Address | null;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Address = {
  key: string;
  title: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  mobile: string;
  email: string;
};
