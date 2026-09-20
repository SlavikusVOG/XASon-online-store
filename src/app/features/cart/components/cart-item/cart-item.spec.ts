import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FALLBACK_MONEY, LineItem } from '@models/features/cart';
import { provideTaiga } from '@taiga-ui/core';
import { CartItem } from './cart-item';

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

const mockItem: LineItem = {
  id: 'prod-1',
  productId: 'prod-1',
  productKey: 'portal-gun',
  name: 'Portal Gun',
  image: '',
  quantity: 2,
  price: {
    id: 'prod-1',
    key: 'portal-gun',
    value: { ...FALLBACK_MONEY, centAmount: 1000 },
  },
};

describe('CartItem', () => {
  let component: CartItem;
  let fixture: ComponentFixture<CartItem>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [CartItem],
      providers: [provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockItem);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name, quantity and prices', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Portal Gun');
    expect(text).toContain('2');
  });

  it('should emit quantityChanged when increase is clicked', () => {
    const spy = vi.fn();
    component.quantityChanged.subscribe(spy);

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const increase = buttons[1] as HTMLButtonElement;
    increase.click();

    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should emit quantityChanged when decrease is clicked', () => {
    const spy = vi.fn();
    component.quantityChanged.subscribe(spy);

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const decrease = buttons[0] as HTMLButtonElement;
    decrease.click();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not emit decrease when quantity is 1', () => {
    fixture.componentRef.setInput('item', { ...mockItem, quantity: 1 });
    fixture.detectChanges();

    const spy = vi.fn();
    component.quantityChanged.subscribe(spy);

    const decrease = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(decrease.disabled).toBe(true);
    decrease.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit removed when remove is clicked', () => {
    const spy = vi.fn();
    component.removed.subscribe(spy);

    const remove = fixture.nativeElement.querySelector('.cart-item__remove') as HTMLButtonElement;
    remove.click();

    expect(spy).toHaveBeenCalled();
  });
});
