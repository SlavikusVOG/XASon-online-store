import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageSearch } from 'lucide';

import { DataPlaceholder } from './data-placeholder';

describe('DataPlaceholder', () => {
  let component: DataPlaceholder;
  let fixture: ComponentFixture<DataPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPlaceholder],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPlaceholder);
    fixture.componentRef.setInput('icon', PackageSearch);
    fixture.componentRef.setInput('text', 'Nothing found');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
