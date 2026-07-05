import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivePasswordInput } from './password-input';

describe('PasswordInput', () => {
  let component: ReactivePasswordInput;
  let fixture: ComponentFixture<ReactivePasswordInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivePasswordInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactivePasswordInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
