import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@models/features/catalog';
import { provideTaiga } from '@taiga-ui/core';
import { ProductCard } from './product-card';

function mockMatchMedia(): void {
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
}

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  image: 'test.jpg',
  description: 'A test product',
  isInCart: false,
};

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product details', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.product-card__name')?.textContent).toContain('Test Product');
    expect(el.querySelector('.product-card__description')?.textContent).toContain('A test product');

    const img = el.querySelector('img');
    expect(img?.getAttribute('src')).toBe('test.jpg');
    expect(img?.getAttribute('alt')).toBe('Test Product');
  });

  it('should show Add to cart when product is not in cart', () => {
    expect(fixture.nativeElement.textContent).toContain('Add to cart');
    expect(fixture.nativeElement.textContent).not.toContain('Remove from cart');
  });

  it('should show Remove from cart when product is in cart', () => {
    fixture.componentRef.setInput('product', { ...mockProduct, isInCart: true });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Remove from cart');
    expect(fixture.nativeElement.textContent).not.toContain('Add to cart');
  });

  it('should emit addedToCart when Add to cart is clicked', () => {
    const spy = vi.fn();
    component.addedToCart.subscribe(spy);

    const button = fixture.nativeElement.querySelector('button');
    button?.click();

    expect(spy).toHaveBeenCalledWith(mockProduct);
  });

  it('should emit removedFromCart when Remove from cart is clicked', () => {
    fixture.componentRef.setInput('product', { ...mockProduct, isInCart: true });
    fixture.detectChanges();

    const spy = vi.fn();
    component.removedFromCart.subscribe(spy);

    const button = fixture.nativeElement.querySelector('button');
    button?.click();

    expect(spy).toHaveBeenCalledWith({ ...mockProduct, isInCart: true });
  });
});
