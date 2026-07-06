import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageSearch } from 'lucide';

import { LucideIcon } from './lucide-icon';

describe('LucideIcon', () => {
  let component: LucideIcon;
  let fixture: ComponentFixture<LucideIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucideIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(LucideIcon);
    fixture.componentRef.setInput('icon', PackageSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
