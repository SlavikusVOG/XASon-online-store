import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { User } from '@models/features/user-profile';
import { Observable, of } from 'rxjs';

export abstract class AuthServiceBase {
  abstract register(credentials: RegisterCredentials): Observable<User>;
  abstract login(credentials: LoginCredentials): Observable<User>;
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
  ): Observable<User> {
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
    } as User);
  }
  login(
    credentials: LoginCredentials = {
      email: 'john.doe@example.com',
      password: 'password',
    },
  ): Observable<User> {
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
    } as User);
  }
  isAuthenticated(): boolean {
    return true;
  }
}
