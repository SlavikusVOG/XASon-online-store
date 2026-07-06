import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { CustomerGetResponse } from '@models/http/request/me.type';
import { Observable, of } from 'rxjs';

export abstract class AuthServiceBase {
  abstract register(credentials: RegisterCredentials): Observable<CustomerGetResponse>;
  abstract login(credentials: LoginCredentials): Observable<CustomerGetResponse>;
  abstract isAuthenticated(): boolean;
}

export class MockAuthService implements AuthServiceBase {
  register(
    credentials: RegisterCredentials = {
      email: 'john.doe@example.com',
      password: 'password',
      firstName: '',
      lastName: '',
    },
  ): Observable<CustomerGetResponse> {
    return of({
      ...credentials,
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'USER',
      phoneNumber: '1234567890',
      dateOfBirth: new Date(),
      street: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'USA',
    } as unknown as CustomerGetResponse);
  }
  login(
    credentials: LoginCredentials = {
      email: 'john.doe@example.com',
      password: 'password',
    },
  ): Observable<CustomerGetResponse> {
    return of({
      ...credentials,
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'USER',
      phoneNumber: '1234567890',
      dateOfBirth: new Date(),
      street: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'USA',
    } as unknown as CustomerGetResponse);
  }
  isAuthenticated(): boolean {
    return true;
  }
}
