import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { User } from '@models/features/user-profile';
import { Observable, of } from 'rxjs';

export type IAuthService = {
  register(credentials: RegisterCredentials): Observable<User>;
  login(credentials: LoginCredentials): Observable<User>;
  isAuthenticated(): boolean;
};

export class MockAuthService implements IAuthService {
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
