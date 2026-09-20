import { promoCodes } from '../../../mocks/main.mocks';

function parsePercentDiscount(discount: string): number | null {
  const match = /^(\d+(?:\.\d+)?)%$/.exec(discount.trim());
  if (!match) {
    return null;
  }

  return Number(match[1]) / 100;
}

export const PROMO_RATES = new Map(
  promoCodes
    .filter((promo) => promo.isActive)
    .map((promo) => [promo.code.toUpperCase(), parsePercentDiscount(promo.discount)] as const)
    .filter((entry): entry is readonly [string, number] => entry[1] !== null),
);

export function resolvePromoCode(code: string | null | undefined): string | null {
  if (typeof code !== 'string') {
    return null;
  }

  const normalized = code.trim().toUpperCase();
  return PROMO_RATES.has(normalized) ? normalized : null;
}
