import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ReactiveFormInput } from './reactive-form-input';

describe('ReactiveFormInput', () => {
  let component: ReactiveFormInput;
  let fixture: ComponentFixture<ReactiveFormInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormInput);
    fixture.componentRef.setInput('inputLabel', 'Email');
    fixture.componentRef.setInput('inputId', 'email');
    fixture.componentRef.setInput('control', new FormControl(''));
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
