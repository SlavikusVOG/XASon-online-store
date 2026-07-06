type ProductCatalogData = {
  published?: boolean;
  current: ProductData;
  staged?: ProductData;
};

type ProductData = {
  name: string;
  description: string;
  variants: ProductVariant;
};

type ProductVariant = {
  id: number;
  key: string;
  images: Image[];
};

type Image = {
  url: string;
  dimensions?: ImageDimensions;
};

type ImageDimensions = {
  w: number;
  h: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  isInCart: boolean;
};

export type ProductPagedQueryResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductDto[];
};

export type CatalogProductsGetQueries = {
  limit: number;
  offset: number;
};

export type ProductDto2 = {
  id: string;
  key: string;
  masterData: ProductCatalogData;
};

export type ProductDto = {
  id: string;
  version: number;
  productType: {
    typeId: string;
    id: string;
  };
  name: Record<string, string>;
  description: Record<string, string>;
  categories: { typeId: string; id: string }[];
  slug: Record<string, string>;
  masterVariant: {
    id: number;
    sku: string;
    key: string;
    prices: {
      id: string;
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      key: string;
      country: string;
    }[];
    images: {
      url: string;
      dimensions: { w: number; h: number };
    }[];
    availability: {
      isOnStock: boolean;
      availableQuantity: number;
      version: number;
      id: string;
    };
  };
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  taxCategory: {
    typeId: string;
    id: string;
  };
  createdAt: string;
  lastModifiedAt: string;
};
