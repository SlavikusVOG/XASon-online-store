import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTaiga } from '@taiga-ui/core';
import { Category } from '@models/features/home';
import { CategoryNav } from './category-nav';

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

const mockCategories: Category[] = [
  { id: '1', name: 'Rick & Morty', slug: 'rick-and-morty', image: '', productCount: 20 },
  { id: '2', name: 'Adventure Time', slug: 'adventure-time', image: '', productCount: 18 },
];

describe('CategoryNav', () => {
  let component: CategoryNav;
  let fixture: ComponentFixture<CategoryNav>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [CategoryNav],
      providers: [provideRouter([]), provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNav);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('categories', mockCategories);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Shop by Category');
  });

  it('should render all categories', () => {
    const chips = fixture.nativeElement.querySelectorAll('.categories__chip');
    expect(chips.length).toBe(2);
  });

  it('should display category names', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Rick & Morty');
    expect(text).toContain('Adventure Time');
  });

  it('should link each category to catalog with query param', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = el.querySelectorAll<HTMLAnchorElement>('a');

    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toContain('/catalog');
    expect(links[0].getAttribute('href')).toContain('category=rick-and-morty');
    expect(links[1].getAttribute('href')).toContain('category=adventure-time');
  });

  it('should show category initials', () => {
    const icons = fixture.nativeElement.querySelectorAll('.categories__chip-icon');
    expect(icons.length).toBe(2);
  });

  it('should expose PAGES constant', () => {
    expect(component.PAGES).toBeDefined();
    expect(component.PAGES.CATALOG).toBeDefined();
  });
});
