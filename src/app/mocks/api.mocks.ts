import { ProductDto } from '../models/features/catalog/product.types';
import { CustomerGetResponse } from '../models/http/request/me.type';

export const mockToken = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 172_800,
  token_type: 'Bearer',
  scope: 'mock-scope',
} as const;

export const mockProductDtos: ProductDto[] = [
  createProductDto({
    id: '1',
    name: 'Item 1',
    description: 'Some description for a great item №1',
  }),
  createProductDto({
    id: '2',
    name: 'Item 2',
    description: 'Some description for a great item №2',
  }),
  createProductDto({
    id: '3',
    name: 'Item 3',
    description: 'Some description for a great item №3',
  }),
  createProductDto({
    id: '4',
    name: 'Item 4',
    description: 'Some description for a great item №4',
  }),
  createProductDto({
    id: '5',
    name: 'Item 5',
    description: 'Some description for a great item №5',
  }),
  createProductDto({
    id: '6',
    name: 'Item 6',
    description: 'Some description for a great item №6',
  }),
];

export function createMockCustomer(): CustomerGetResponse {
  return {
    id: 'mock-customer-1',
    version: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    lastModifiedAt: '2026-01-01T00:00:00.000Z',
    lastModifiedBy: { clientId: 'mock-client', isPlatformClient: false },
    createdBy: { clientId: 'mock-client', isPlatformClient: false },
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-15',
    password: '**********',
    addresses: [
      {
        id: 'addr-1',
        key: 'home',
        firstName: 'John',
        lastName: 'Doe',
        streetName: 'Main St',
        streetNumber: '123',
        postalCode: '12345',
        city: 'Anytown',
        country: 'US',
        email: 'john.doe@example.com',
      },
    ],
    shippingAddressIds: ['addr-1'],
    billingAddressIds: ['addr-1'],
    isEmailVerified: true,
    stores: [],
    authenticationMode: 'Password',
    customerGroupAssignments: [],
  };
}

function createProductDto(item: { id: string; name: string; description: string }): ProductDto {
  return {
    id: item.id,
    version: 1,
    productType: { typeId: 'product-type', id: 'pt-1' },
    name: { 'en-US': item.name },
    description: { 'en-US': item.description },
    categories: [],
    slug: { 'en-US': `item-${item.id}` },
    masterVariant: {
      id: 1,
      sku: `SKU-${item.id}`,
      key: `variant-${item.id}`,
      prices: [
        {
          id: `price-${item.id}`,
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 1999,
            fractionDigits: 2,
          },
          key: `price-key-${item.id}`,
          country: 'DE',
        },
      ],
      images: [
        { url: `https://picsum.photos/seed/${item.id}/400/400`, dimensions: { w: 400, h: 400 } },
      ],
      availability: {
        isOnStock: true,
        availableQuantity: 10,
        version: 1,
        id: `avail-${item.id}`,
      },
    },
    hasStagedChanges: false,
    published: true,
    key: `item-${item.id}`,
    taxCategory: { typeId: 'tax-category', id: 'tax-1' },
    createdAt: '2026-01-01T00:00:00.000Z',
    lastModifiedAt: '2026-01-01T00:00:00.000Z',
  };
}
