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
  results: Product[];
};

export type CatalogProductsGetQueries = {
  limit: number;
  offset: number;
};

export type ProductsDto = {
  id: string;
  key: string;
  masterData: ProductCatalogData;
};
