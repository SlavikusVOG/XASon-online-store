import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartStore } from '@features/cart/store';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let itemCount: ReturnType<typeof signal<number>>;

  beforeEach(async () => {
    itemCount = signal(0);

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([]), { provide: CartStore, useValue: { itemCount } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a cart link without a badge when empty', () => {
    const cartLink = fixture.nativeElement.querySelector('.header__cart') as HTMLAnchorElement;

    expect(cartLink).toBeTruthy();
    expect(cartLink.getAttribute('aria-label')).toBe('Cart, empty');
    expect(fixture.nativeElement.querySelector('.header__badge')).toBeNull();
  });

  it('should show the item count badge from CartStore', () => {
    itemCount.set(3);
    fixture.detectChanges();

    const cartLink = fixture.nativeElement.querySelector('.header__cart') as HTMLAnchorElement;
    const badge = fixture.nativeElement.querySelector('.header__badge');

    expect(cartLink.getAttribute('aria-label')).toBe('Cart, 3 items');
    expect(badge?.textContent).toBe('3');
  });
});
