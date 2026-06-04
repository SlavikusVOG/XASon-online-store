export type LoginCredentials = {
  email: string;
  password: string;
  // TODO: add anonymous cart
};

export type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};
