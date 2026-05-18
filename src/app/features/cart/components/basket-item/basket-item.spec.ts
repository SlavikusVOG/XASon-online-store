import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketItem } from './basket-item';

describe('BasketItem', () => {
  let component: BasketItem;
  let fixture: ComponentFixture<BasketItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
