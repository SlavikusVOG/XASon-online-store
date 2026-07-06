import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTaiga } from '@taiga-ui/core';
import { PromoCode } from '@models/features/home';
import { PromoCodesDisplay } from './promo-codes-display';

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

const mockPromoCodes: PromoCode[] = [
  {
    id: '1',
    code: 'WELCOME10',
    description: '10% off for new customers',
    discount: '10%',
    isActive: true,
  },
  {
    id: '2',
    code: 'ARTIFACT20',
    description: '20% off on all accessories',
    discount: '20%',
    isActive: true,
  },
];

describe('PromoCodesDisplay', () => {
  let component: PromoCodesDisplay;
  let fixture: ComponentFixture<PromoCodesDisplay>;

  beforeEach(async () => {
    mockMatchMedia();

    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    await TestBed.configureTestingModule({
      imports: [PromoCodesDisplay],
      providers: [provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoCodesDisplay);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('promoCodes', mockPromoCodes);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title and description', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Active Promo Codes');
    expect(text).toContain('Use these codes at checkout to get discounts on your favorite items.');
  });

  it('should render all promo codes', () => {
    const cards = fixture.nativeElement.querySelectorAll('.promo-codes__card');
    expect(cards.length).toBe(2);
  });

  it('should display promo code descriptions', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('10% off for new customers');
    expect(text).toContain('20% off on all accessories');
  });

  it('should display promo codes in monospace', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('WELCOME10');
    expect(text).toContain('ARTIFACT20');
  });

  it('should render copy button for each promo code', () => {
    const copyButtons = fixture.nativeElement.querySelectorAll('.promo-codes__copy');
    expect(copyButtons.length).toBe(2);
  });

  it('should copy code to clipboard on button click and set copiedId', async () => {
    const copyButton = fixture.nativeElement.querySelector(
      '.promo-codes__copy',
    ) as HTMLButtonElement;

    copyButton?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('WELCOME10');
    expect(component.copiedId()).toBe('1');
  });

  it('should reset copiedId after timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const promise = component.copyCode('WELCOME10', '1');
    await vi.advanceTimersByTimeAsync(1500);

    expect(component.copiedId()).toBeNull();
    await promise;

    vi.useRealTimers();
  });

  it('should show copy icon when code is not copied', () => {
    const icon = fixture.nativeElement.querySelector('tui-icon');
    expect(icon?.getAttribute('icon')).toBe('@tui.copy');
  });

  it('should render nothing when promo codes array is empty', () => {
    fixture.componentRef.setInput('promoCodes', []);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.promo-codes')).toBeFalsy();
    expect(el.textContent?.trim()).toBe('');
  });
});
