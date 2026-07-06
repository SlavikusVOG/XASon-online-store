import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonalInformation } from '@features/user-profile/components';
import { User } from '@models/features/user-profile';
import { ApiService } from '@core/http';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';

@Component({
  selector: 'xas-user-profile-page',
  imports: [PersonalInformation],
  templateUrl: './user-profile-page.html',
  styleUrl: './user-profile-page.scss',
})
export class UserProfilePage implements OnInit {
  private readonly apiService = inject(ApiService);
  protected readonly loadStatus = signal<DataLoadStatus>(DATA_LOAD_STATUSES.INIT);
  protected readonly user = signal<User | null>(null);
  // userMock: ProcessedUser = {
  //   id: '1',
  //   email: 'test@test.com',
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   dateOfBirth: new Date(),
  //   street: '123 Main St',
  //   city: 'Anytown',
  //   postalCode: '12345',
  //   country: 'USA',
  // };

  ngOnInit(): void {
    this.loadStatus.set(DATA_LOAD_STATUSES.LOADING);
    this.apiService
      .getMe({
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (user) => {
          this.user.set(user);
        },
      });
  }
}
