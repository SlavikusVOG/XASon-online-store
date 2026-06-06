import { Component } from '@angular/core';
import { User } from '@models/features/user-profile';
import { PersonalInformation } from '@shared/components';

@Component({
  selector: 'xas-user-profile-page',
  imports: [PersonalInformation],
  templateUrl: './user-profile-page.html',
  styleUrl: './user-profile-page.scss',
})
export class UserProfilePage {
  user: User = {
    id: '1',
    email: 'test@test.com',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date(),
    street: '123 Main St',
    city: 'Anytown',
    postalCode: '12345',
    country: 'USA',
  };
}
