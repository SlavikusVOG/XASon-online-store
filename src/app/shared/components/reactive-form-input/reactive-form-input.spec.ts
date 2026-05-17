import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormInput } from './reactive-form-input';

describe('ReactiveFormInput', () => {
  let component: ReactiveFormInput;
  let fixture: ComponentFixture<ReactiveFormInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
