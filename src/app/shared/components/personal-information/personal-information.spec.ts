import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformation, User } from './personal-information';

describe('PersonalInformation', () => {
  let component: PersonalInformation;
  let fixture: ComponentFixture<PersonalInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInformation);
    fixture.componentRef.setInput('user', {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      street: 'Main St',
      city: 'Springfield',
      postalCode: '12345',
      country: 'USA',
    } satisfies User);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
