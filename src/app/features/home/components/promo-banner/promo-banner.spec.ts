import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTaiga } from '@taiga-ui/core';
import { Banner } from '@models/features/home';
import { PromoBanner } from './promo-banner';

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

const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Summer Sale!',
    subtitle: 'Get up to 50% off on selected items',
    image: 'summer.jpg',
    link: '/catalog',
  },
  {
    id: '2',
    title: 'Winter Deals',
    subtitle: 'Best prices of the season',
    image: '',
    link: '/catalog',
  },
];

describe('PromoBanner', () => {
  let component: PromoBanner;
  let fixture: ComponentFixture<PromoBanner>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [PromoBanner],
      providers: [provideRouter([]), provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoBanner);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('banners', mockBanners);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all banners', () => {
    const el = fixture.nativeElement as HTMLElement;
    const slides = el.querySelectorAll('.banner__slide');
    expect(slides.length).toBe(2);
  });

  it('should display banner title and subtitle', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Summer Sale!');
    expect(text).toContain('Get up to 50% off on selected items');
    expect(text).toContain('Winter Deals');
    expect(text).toContain('Best prices of the season');
  });

  it('should render routerLink for each banner', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = el.querySelectorAll('a');
    expect((links[0] as HTMLAnchorElement).getAttribute('href')).toBe('/catalog');
    expect((links[1] as HTMLAnchorElement).getAttribute('href')).toBe('/catalog');
  });

  it('should render image when banner has image', () => {
    const el = fixture.nativeElement as HTMLElement;
    const img = el.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('summer.jpg');
    expect(img?.getAttribute('alt')).toBe('Summer Sale!');
  });

  it('should not render image when banner has no image', () => {
    const el = fixture.nativeElement as HTMLElement;
    const images = el.querySelectorAll('img');
    expect(images.length).toBe(1);
  });

  it('should have "Hot Deal" badge', () => {
    const badges = fixture.nativeElement.querySelectorAll('.banner__badge');
    expect(badges.length).toBe(2);
    badges.forEach((badge: Element) => expect(badge.textContent).toContain('Hot Deal'));
  });

  it('should render "Shop Now" button', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.banner__cta');
    expect(buttons.length).toBe(2);
    buttons.forEach((btn: Element) => expect(btn.textContent).toContain('Shop Now'));
  });

  it('should render nothing when banners array is empty', () => {
    fixture.componentRef.setInput('banners', []);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.banner')).toBeFalsy();
    expect(el.textContent).toBe('');
  });
});
