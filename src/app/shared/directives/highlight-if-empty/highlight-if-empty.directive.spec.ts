import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { HighlightIfEmptyDirective } from './highlight-if-empty.directive';

@Component({
  imports: [ReactiveFormsModule, HighlightIfEmptyDirective],
  template: `<input xasHighlightIfEmpty [formControl]="control" />`,
})
class TestHostComponent {
  readonly control = new FormControl('');
}

describe('HighlightIfEmptyDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should highlight an empty input', () => {
    expect(input.classList.contains('input-empty')).toBe(true);
  });

  it('should remove highlight when input has a value', () => {
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.classList.contains('input-empty')).toBe(false);
  });

  it('should highlight again when value is cleared', () => {
    fixture.componentInstance.control.setValue('test@example.com');
    fixture.detectChanges();
    expect(input.classList.contains('input-empty')).toBe(false);

    fixture.componentInstance.control.setValue('');
    fixture.detectChanges();

    expect(input.classList.contains('input-empty')).toBe(true);
  });
});
