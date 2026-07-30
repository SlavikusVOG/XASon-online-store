import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessedUser } from '@models/features/user-profile';
import { provideTaiga, TuiRoot } from '@taiga-ui/core';

import { PersonalInformation } from './personal-information';

const mockUser: ProcessedUser = {
  id: '1',
  version: 1,
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date(1990, 0, 1),
  street: 'Main St',
  city: 'Springfield',
  postalCode: '12345',
  country: 'USA',
  address: null,
};

@Component({
  imports: [TuiRoot, PersonalInformation],
  template: `
    <tui-root>
      <xas-personal-information [user]="user" />
    </tui-root>
  `,
})
class TestHostComponent {
  user = mockUser;
}

describe('PersonalInformation', () => {
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
      providers: [provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
