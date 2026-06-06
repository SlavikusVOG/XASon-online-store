import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '../../../../types/features/catalog/product.types';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', {
      id: '1',
      name: 'Test Product',
      image: 'test.jpg',
      description: 'A test product',
      isInCart: false,
    } satisfies Product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
