import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSessionService } from '@core/auth';
import { ProcessedUser } from '@models/features/user-profile';
import { provideTaiga, TuiRoot } from '@taiga-ui/core';
import { of } from 'rxjs';

import { UserProfilePage } from './user-profile-page';

const mockUser: ProcessedUser = {
  id: '1',
  address: null,
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('1990-01-01'),
  street: 'Main St',
  city: 'Springfield',
  postalCode: '12345',
  country: 'USA',
};

@Component({
  imports: [TuiRoot, UserProfilePage],
  template: `
    <tui-root>
      <xas-user-profile-page />
    </tui-root>
  `,
})
class TestHostComponent {}

describe('UserProfilePage', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideTaiga(),
        {
          provide: CustomerSessionService,
          useValue: {
            getUser: () => of(mockUser),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
