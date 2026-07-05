import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveInput } from './input';

describe('Input', () => {
  let component: ReactiveInput;
  let fixture: ComponentFixture<ReactiveInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
